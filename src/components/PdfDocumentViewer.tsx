import { useEffect, useRef, useState } from 'react'
import type { PDFPageProxy, RenderTask } from 'pdfjs-dist'

interface PdfDocumentViewerProps {
  path: string
  title: string
}

export function PdfDocumentViewer({ path, title }: PdfDocumentViewerProps) {
  const frameRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const renderTaskRef = useRef<RenderTask | null>(null)
  const [visible, setVisible] = useState(false)
  const [page, setPage] = useState<PDFPageProxy | null>(null)
  const [frameWidth, setFrameWidth] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { rootMargin: '300px' })
    observer.observe(frame)
    const resizeObserver = new ResizeObserver(() => setFrameWidth(frame.clientWidth))
    resizeObserver.observe(frame)
    setFrameWidth(frame.clientWidth)
    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!visible) return
    let cancelled = false
    let loadingTask: import('pdfjs-dist').PDFDocumentLoadingTask | null = null

    async function loadPage() {
      try {
        const [pdfjs, worker] = await Promise.all([
          import('pdfjs-dist'),
          import('pdfjs-dist/build/pdf.worker.min.mjs?url')
        ])
        if (cancelled) return
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default
        loadingTask = pdfjs.getDocument({ url: `${import.meta.env.BASE_URL}${path}` })
        const document = await loadingTask.promise
        if (cancelled) return
        const firstPage = await document.getPage(1)
        if (!cancelled) setPage(firstPage)
      } catch (error) {
        if (!cancelled) {
          console.error('Unable to load PDF preview', error)
          setStatus('error')
        }
      }
    }

    void loadPage()
    return () => {
      cancelled = true
      renderTaskRef.current?.cancel()
      void loadingTask?.destroy()
    }
  }, [path, visible])

  useEffect(() => {
    if (!page || !frameWidth || !canvasRef.current) return
    const canvas = canvasRef.current
    let cancelled = false

    async function renderPage() {
      try {
        await renderTaskRef.current?.promise.catch(() => {})
        if (cancelled) return
        const base = page!.getViewport({ scale: 1 })
        const scale = (Math.max(frameWidth - 32, 320) / base.width) * zoom
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
        const viewport = page!.getViewport({ scale: scale * pixelRatio })
        canvas.width = Math.ceil(viewport.width)
        canvas.height = Math.ceil(viewport.height)
        canvas.style.width = `${Math.ceil(base.width * scale)}px`
        canvas.style.height = `${Math.ceil(base.height * scale)}px`
        const task = page!.render({ canvas, viewport })
        renderTaskRef.current = task
        await task.promise
        if (!cancelled) setStatus('ready')
      } catch (error) {
        if (!cancelled) {
          console.error('Unable to render PDF preview', error)
          setStatus('error')
        }
      }
    }

    void renderPage()
    return () => {
      cancelled = true
      renderTaskRef.current?.cancel()
    }
  }, [page, frameWidth, zoom])

  return (
    <div className="overflow-hidden border border-forest-line bg-forest-surface">
      <div className="flex items-center justify-between gap-3 border-b border-forest-line px-3 py-2 md:px-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest-accent">PDF preview · page 1</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoom((value) => Math.max(1, value - 0.5))}
            disabled={zoom <= 1}
            className="border border-forest-line px-2 py-1 text-sm font-bold text-ink disabled:opacity-40"
            aria-label="Zoom out of PDF"
          >
            −
          </button>
          <span className="min-w-12 text-center text-xs font-bold text-body">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            onClick={() => setZoom((value) => Math.min(2.5, value + 0.5))}
            disabled={zoom >= 2.5}
            className="border border-forest-line px-2 py-1 text-sm font-bold text-ink disabled:opacity-40"
            aria-label="Zoom in on PDF"
          >
            +
          </button>
        </div>
      </div>
      <div ref={frameRef} className="h-[34rem] overflow-auto bg-[#e6e6e6] p-3 md:h-[46rem]">
        {status === 'loading' ? (
          <p className="py-8 text-center text-sm font-semibold text-body">Loading PDF preview…</p>
        ) : null}
        {status === 'error' ? (
          <p className="py-8 text-center text-sm font-semibold text-body">PDF preview unavailable. Open the PDF in a new tab below.</p>
        ) : null}
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`${title}, page 1`}
          className={status === 'ready' ? 'mx-auto block bg-white shadow-lg' : 'hidden'}
        />
      </div>
    </div>
  )
}
