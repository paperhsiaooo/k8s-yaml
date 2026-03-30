import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const isIndexingAllowed = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'

  if (!isIndexingAllowed) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://808bonus.com.tw/sitemap.xml',
  }
}
