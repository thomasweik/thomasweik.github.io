import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '', ...rest }: CardProps) {
  return (
    <article
      className={`border-t border-line/70 bg-transparent px-0 py-5 md:py-6 ${className}`}
      {...rest}
    >
      {children}
    </article>
  )
}
