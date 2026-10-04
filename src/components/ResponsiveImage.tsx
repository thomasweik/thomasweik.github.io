import type { ImgHTMLAttributes } from 'react'
import { responsiveImages } from '../data/responsiveImages'

export function ResponsiveImage({
  src,
  alt,
  sizes = '(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw',
  loading = 'lazy',
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const image = src ? responsiveImages[src] : undefined
  return (
    <img
      src={src}
      alt={alt}
      srcSet={image && image.smallWidth < image.width
        ? `${image.small} ${image.smallWidth}w, ${src} ${image.width}w`
        : undefined}
      sizes={sizes}
      width={image?.width}
      height={image?.height}
      loading={loading}
      decoding="async"
      {...props}
    />
  )
}
