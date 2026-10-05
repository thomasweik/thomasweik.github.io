interface StepModelPlaceholderProps {
  projectTitle: string
  variant: 'cover' | 'detail'
}

export function StepModelPlaceholder({ projectTitle, variant }: StepModelPlaceholderProps) {
  const detail = variant === 'detail'

  return (
    <div
      role="img"
      aria-label={`STEP model preview placeholder for ${projectTitle}; model not available yet`}
      className={`relative flex flex-col items-center justify-center overflow-hidden border border-forest-line bg-forest-surface text-forest-accent ${
        detail ? 'min-h-72 px-6 py-10 sm:min-h-96' : 'h-48 px-4 py-5 md:h-52'
      }`}
    >
      <div className="model-stage-grid" aria-hidden="true" />
      <span className={`relative z-10 font-bold uppercase tracking-[0.22em] ${detail ? 'text-xs' : 'text-[10px]'}`}>
        STEP / 3D model
      </span>
      <svg
        className={`relative z-10 my-3 text-forest-accent ${detail ? 'h-36 w-48 sm:h-44 sm:w-60' : 'h-20 w-28'}`}
        viewBox="0 0 240 180"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M120 19 211 65v88l-91 45-91-45V65l91-46Z" />
        <path d="m29 65 91 45 91-45M120 110v88" />
        <path d="m64 82 56-28 56 28-56 28-56-28Z" opacity=".45" />
        <path d="M29 153 120 110l91 43M120 19v35" opacity=".35" />
      </svg>
      <span className={`relative z-10 text-center font-semibold uppercase tracking-[0.16em] ${detail ? 'text-xs' : 'text-[10px]'}`}>
        Interactive preview coming soon
      </span>
      {detail ? (
        <p className="relative z-10 mt-3 max-w-md text-center text-sm text-body">
          The STEP model for {projectTitle} will appear here when it is ready to share.
        </p>
      ) : null}
    </div>
  )
}
