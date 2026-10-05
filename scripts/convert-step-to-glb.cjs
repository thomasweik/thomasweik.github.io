// Convert a local STEP file to a browser-friendly GLB without bundling the STEP source.
// Usage: node scripts/convert-step-to-glb.cjs input.step public/models/output.glb [--dark-gray | --dark-gray-all-except=PART_NAME]
const fs = require('node:fs')
const path = require('node:path')
const occtImport = require('occt-import-js')

const [, , source, destination] = process.argv
const partColorOverride = process.argv.slice(4)
  .find((option) => option.startsWith('--dark-gray-all-except=') || option.startsWith('--black-all-except='))
const useDarkGray = process.argv.slice(4).includes('--dark-gray')
const preservedPartName = partColorOverride
  ?.slice(partColorOverride.indexOf('=') + 1)
  .toLocaleLowerCase()
const overrideColor = partColorOverride?.startsWith('--black-all-except=')
  ? [0.015, 0.015, 0.015]
  : [0.12, 0.12, 0.12]

if (!source || !destination || !/\.(step|stp)$/i.test(source) || !/\.glb$/i.test(destination)) {
  console.error('Usage: node scripts/convert-step-to-glb.cjs input.step output.glb')
  process.exit(1)
}

const alignment = (value) => (value + 3) & ~3
const meshes = []
const nodes = []
const materials = []
const materialIndices = new Map()
const bufferViews = []
const accessors = []
const binaryParts = []
let binaryLength = 0
let triangleCount = 0

function addBufferView(bytes, target) {
  const offset = alignment(binaryLength)
  if (offset > binaryLength) binaryParts.push(Buffer.alloc(offset - binaryLength))
  binaryParts.push(bytes)
  binaryLength = offset + bytes.length
  bufferViews.push({ buffer: 0, byteOffset: offset, byteLength: bytes.length, target })
  return bufferViews.length - 1
}

function addAccessor(view, componentType, count, type, bounds) {
  accessors.push({ bufferView: view, componentType, count, type, ...bounds })
  return accessors.length - 1
}

function materialFor(mesh) {
  const name = mesh.name?.toLocaleLowerCase() ?? ''
  const isColorException = preservedPartName && name === preservedPartName
  const hasStepColor = Array.isArray(mesh.color) && mesh.color.length === 3
  const rgb = useDarkGray
    ? [0.12, 0.12, 0.12]
    : preservedPartName
    ? isColorException && hasStepColor ? mesh.color : overrideColor
    : hasStepColor ? mesh.color : [0.42, 0.42, 0.42]
  const key = rgb.map((value) => Math.round(value * 255)).join(',')
  if (materialIndices.has(key)) return materialIndices.get(key)
  const index = materials.length
  materials.push({
    pbrMetallicRoughness: {
      baseColorFactor: [...rgb, 1],
      metallicFactor: 0.08,
      roughnessFactor: 0.68
    },
    doubleSided: true
  })
  materialIndices.set(key, index)
  return index
}

function addMesh(mesh) {
  const sourcePositions = mesh.attributes?.position?.array
  const sourceIndices = mesh.index?.array
  if (!sourcePositions?.length || !sourceIndices?.length) return

  const positions = Float32Array.from(sourcePositions)
  const vertexCount = positions.length / 3
  const minima = [Infinity, Infinity, Infinity]
  const maxima = [-Infinity, -Infinity, -Infinity]
  for (let i = 0; i < positions.length; i += 3) {
    for (let axis = 0; axis < 3; axis++) {
      minima[axis] = Math.min(minima[axis], positions[i + axis])
      maxima[axis] = Math.max(maxima[axis], positions[i + axis])
    }
  }
  const positionView = addBufferView(Buffer.from(positions.buffer), 34962)
  const attributes = {
    POSITION: addAccessor(positionView, 5126, vertexCount, 'VEC3', { min: minima, max: maxima })
  }

  if (mesh.attributes?.normal?.array?.length === positions.length) {
    const normals = Float32Array.from(mesh.attributes.normal.array)
    const normalView = addBufferView(Buffer.from(normals.buffer), 34962)
    attributes.NORMAL = addAccessor(normalView, 5126, vertexCount, 'VEC3')
  }

  const indices = vertexCount <= 65535
    ? Uint16Array.from(sourceIndices)
    : Uint32Array.from(sourceIndices)
  const indexView = addBufferView(Buffer.from(indices.buffer), 34963)
  const indexAccessor = addAccessor(indexView, vertexCount <= 65535 ? 5123 : 5125, indices.length, 'SCALAR')
  const meshIndex = meshes.length
  meshes.push({
    name: mesh.name || `Part ${meshIndex + 1}`,
    primitives: [{ attributes, indices: indexAccessor, material: materialFor(mesh) }]
  })
  nodes.push({ mesh: meshIndex, name: mesh.name || `Part ${meshIndex + 1}` })
  triangleCount += indices.length / 3
}

async function main() {
  const engine = await occtImport()
  const result = engine.ReadStepFile(fs.readFileSync(source), {
    linearUnit: 'millimeter',
    linearDeflectionType: 'bounding_box_ratio',
    linearDeflection: 0.005,
    angularDeflection: 0.5
  })
  if (!result.success || !result.meshes?.length) throw new Error('STEP import produced no meshes')
  for (const mesh of result.meshes) addMesh(mesh)

  const document = {
    asset: { version: '2.0', generator: 'occt-import-js + local GLB converter' },
    scene: 0,
    scenes: [{ nodes: nodes.map((_, index) => index) }],
    nodes,
    meshes,
    materials,
    buffers: [{ byteLength: alignment(binaryLength) }],
    bufferViews,
    accessors
  }
  const json = Buffer.from(JSON.stringify(document))
  const jsonLength = alignment(json.length)
  const dataLength = alignment(binaryLength)
  const header = Buffer.alloc(12)
  header.writeUInt32LE(0x46546c67, 0)
  header.writeUInt32LE(2, 4)
  header.writeUInt32LE(12 + 8 + jsonLength + 8 + dataLength, 8)
  const jsonHeader = Buffer.alloc(8)
  jsonHeader.writeUInt32LE(jsonLength, 0)
  jsonHeader.writeUInt32LE(0x4e4f534a, 4)
  const binHeader = Buffer.alloc(8)
  binHeader.writeUInt32LE(dataLength, 0)
  binHeader.writeUInt32LE(0x004e4942, 4)

  fs.mkdirSync(path.dirname(destination), { recursive: true })
  fs.writeFileSync(destination, Buffer.concat([
    header, jsonHeader, json, Buffer.alloc(jsonLength - json.length, 0x20),
    binHeader, ...binaryParts, Buffer.alloc(dataLength - binaryLength)
  ]))
  console.log(`${nodes.length} parts, ${triangleCount.toLocaleString()} triangles, ${(fs.statSync(destination).size / 1024 / 1024).toFixed(1)} MB`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
