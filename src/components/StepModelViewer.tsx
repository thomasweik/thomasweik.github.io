import { useEffect, useRef, useState } from 'react'

interface StepModelViewerProps {
  modelPath: string
  projectTitle: string
  mode: 'scroll' | 'manual'
  compact?: boolean
  rotationOffsetDegrees?: number
  rotationXDegrees?: number
  rotationYDegrees?: number
  viewAxisRotationDegrees?: number
  cameraPosition?: [number, number, number]
  upAxis?: 'y' | 'z'
}

const DEFAULT_CAMERA_POSITION: [number, number, number] = [1.75, 0.03, 0.12]

export function StepModelViewer({
  modelPath,
  projectTitle,
  mode,
  compact = false,
  rotationOffsetDegrees = 0,
  rotationXDegrees = 0,
  rotationYDegrees = 0,
  viewAxisRotationDegrees = 0,
  cameraPosition = DEFAULT_CAMERA_POSITION,
  upAxis = 'z'
}: StepModelViewerProps) {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    if (!stageRef.current) return
    const stage: HTMLDivElement = stageRef.current

    let cancelled = false
    let started = false
    let visible = false
    let animationFrame = 0
    let cleanupViewer = () => {}
    let cleanupPending = () => {}
    let renderFrame = () => {}

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !started) {
          started = true
          void startViewer()
        }
        if (visible) renderFrame()
      },
      { rootMargin: '250px' }
    )

    async function startViewer() {
      try {
        const [THREE, { GLTFLoader }, controlsModule] = await Promise.all([
          import('three'),
          import('three/addons/loaders/GLTFLoader.js'),
          mode === 'manual' ? import('three/addons/controls/OrbitControls.js') : Promise.resolve(null)
        ])
        if (cancelled) return

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mode === 'manual' ? 2 : 1.5))
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.3
        renderer.domElement.setAttribute('aria-hidden', 'true')
        renderer.domElement.style.width = '100%'
        renderer.domElement.style.height = '100%'
        renderer.domElement.style.display = 'block'
        stage.appendChild(renderer.domElement)
        let pendingDisposed = false
        cleanupPending = () => {
          if (pendingDisposed) return
          pendingDisposed = true
          renderer.dispose()
          renderer.domElement.remove()
        }

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(42, 1, 0.01, 100000)
        camera.up.set(0, upAxis === 'y' ? 1 : 0, upAxis === 'z' ? 1 : 0)
        scene.add(new THREE.HemisphereLight(0xffffff, 0x949494, 2.0))
        const keyLight = new THREE.DirectionalLight(0xffffff, 2.0)
        keyLight.position.set(1, -2, 3)
        scene.add(keyLight)
        const fillLight = new THREE.DirectionalLight(0xffffff, 1.0)
        fillLight.position.set(-2, 1, 1)
        scene.add(fillLight)

        const loader = new GLTFLoader()
        const gltf = await loader.loadAsync(`${import.meta.env.BASE_URL}${modelPath}`)
        if (cancelled) {
          cleanupPending()
          return
        }

        const bounds = new THREE.Box3().setFromObject(gltf.scene)
        const center = bounds.getCenter(new THREE.Vector3())
        const size = bounds.getSize(new THREE.Vector3())
        const diameter = Math.max(size.x, size.y, size.z)
        if (!Number.isFinite(diameter) || diameter <= 0) throw new Error('Model geometry is empty')

        gltf.scene.position.sub(center)
        const pivot = new THREE.Group()
        const orientation = new THREE.Group()
        orientation.add(gltf.scene)
        pivot.add(orientation)
        const baseRotation = (90 + rotationOffsetDegrees) * Math.PI / 180
        if (upAxis === 'y') pivot.rotation.y = baseRotation
        else pivot.rotation.z = baseRotation
        orientation.rotation.x = rotationXDegrees * Math.PI / 180
        orientation.rotation.y = rotationYDegrees * Math.PI / 180
        scene.add(pivot)
        camera.near = Math.max(diameter / 1000, 0.01)
        camera.far = diameter * 25
        camera.position.set(
          diameter * cameraPosition[0],
          diameter * cameraPosition[1],
          diameter * cameraPosition[2]
        )
        camera.lookAt(0, 0, 0)
        camera.updateProjectionMatrix()
        if (viewAxisRotationDegrees) {
          const viewAxis = camera.getWorldDirection(new THREE.Vector3())
            .applyQuaternion(pivot.quaternion.clone().invert())
            .normalize()
          const viewRotation = new THREE.Quaternion().setFromAxisAngle(
            viewAxis,
            viewAxisRotationDegrees * Math.PI / 180
          )
          orientation.quaternion.premultiply(viewRotation)
        }

        const controls = controlsModule ? new controlsModule.OrbitControls(camera, renderer.domElement) : null
        if (controls) {
          controls.enableDamping = true
          controls.enablePan = false
          controls.minDistance = diameter * 0.6
          controls.maxDistance = diameter * 7
          controls.target.set(0, 0, 0)
          controls.update()
        } else {
          renderer.domElement.style.pointerEvents = 'none'
        }

        const resize = () => {
          const width = stage.clientWidth
          const height = stage.clientHeight
          if (!width || !height) return
          camera.aspect = width / height
          camera.updateProjectionMatrix()
          renderer.setSize(width, height, false)
          renderer.render(scene, camera)
        }
        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(stage)
        resize()

        if (mode === 'scroll') {
          const updateRotation = () => {
            if (!visible) return
            const rect = stage.getBoundingClientRect()
            const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
            const rotation = window.matchMedia('(prefers-reduced-motion: reduce)').matches
              ? baseRotation
              : baseRotation + progress * Math.PI * 4
            if (upAxis === 'y') pivot.rotation.y = rotation
            else pivot.rotation.z = rotation
            renderer.render(scene, camera)
          }
          renderFrame = updateRotation
          window.addEventListener('scroll', updateRotation, { passive: true })
          updateRotation()
          cleanupViewer = () => {
            window.removeEventListener('scroll', updateRotation)
            resizeObserver.disconnect()
            gltf.scene.traverse((object) => {
              if (object instanceof THREE.Mesh) {
                object.geometry.dispose()
                const materials = Array.isArray(object.material) ? object.material : [object.material]
                materials.forEach((material) => material.dispose())
              }
            })
            renderer.dispose()
            renderer.domElement.remove()
          }
        } else {
          const animate = () => {
            if (!visible) {
              animationFrame = 0
              return
            }
            controls?.update()
            renderer.render(scene, camera)
            animationFrame = window.requestAnimationFrame(animate)
          }
          renderFrame = () => {
            if (!animationFrame) animationFrame = window.requestAnimationFrame(animate)
          }
          cleanupViewer = () => {
            window.cancelAnimationFrame(animationFrame)
            controls?.dispose()
            resizeObserver.disconnect()
            gltf.scene.traverse((object) => {
              if (object instanceof THREE.Mesh) {
                object.geometry.dispose()
                const materials = Array.isArray(object.material) ? object.material : [object.material]
                materials.forEach((material) => material.dispose())
              }
            })
            renderer.dispose()
            renderer.domElement.remove()
          }
          renderFrame()
        }

        cleanupPending = () => {}
        setState('ready')
      } catch (error) {
        cleanupPending()
        if (!cancelled) {
          console.error('Unable to load STEP model preview', error)
          setState('error')
        }
      }
    }

    observer.observe(stage)
    return () => {
      cancelled = true
      observer.disconnect()
      window.cancelAnimationFrame(animationFrame)
      cleanupViewer()
      cleanupPending()
    }
  }, [modelPath, mode, rotationOffsetDegrees, rotationXDegrees, rotationYDegrees, viewAxisRotationDegrees, cameraPosition, upAxis])

  const manual = mode === 'manual'
  return (
    <div className={compact ? '' : 'space-y-3'}>
      <div
        className={`relative overflow-hidden border border-forest-line bg-forest-surface ${compact ? 'h-28' : manual ? 'h-80 sm:h-[28rem]' : 'h-48 md:h-52'}`}
        role="group"
        aria-label={`${projectTitle} 3D model`}
      >
        <div ref={stageRef} className="absolute inset-0" />
        <span className={`pointer-events-none absolute border border-forest-line bg-forest-surface/90 font-bold uppercase text-forest-accent ${compact ? 'left-1.5 top-1.5 px-1 py-0.5 text-[8px] tracking-[0.1em]' : 'left-3 top-3 px-2 py-1 text-[10px] tracking-[0.15em] sm:left-5 sm:top-5'}`}>
          {compact ? '3D' : '3D model'}
        </span>
        {state !== 'ready' ? (
          <p className={`pointer-events-none absolute inset-0 grid place-items-center px-2 text-center font-semibold text-body ${compact ? 'text-[10px]' : 'px-5 text-sm'}`}>
            {state === 'error' ? '3D preview unavailable' : 'Preparing 3D model…'}
          </p>
        ) : null}
        <span className={`pointer-events-none absolute bottom-1.5 left-1 right-1 text-center font-bold uppercase text-forest-accent ${compact ? 'text-[7px] tracking-[0.08em]' : 'bottom-3 left-3 right-3 text-[10px] tracking-[0.13em] sm:bottom-5'}`}>
          {compact ? 'Scroll to rotate' : manual ? 'Drag to rotate · Pinch or scroll to zoom' : 'Scroll to rotate · Open project to explore'}
        </span>
      </div>
    </div>
  )
}
