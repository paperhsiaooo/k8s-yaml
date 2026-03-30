interface CdnLoaderProps {
  src: string
}

export default function cdnLoader({ src }: CdnLoaderProps): string {
  return `${src}`
}
