import { DEFAULT_LOCALE, LOCALES } from '@/i18n/routing'
import { getPosts } from '@/lib/getBlogs'
import { tools } from '@/data/tools'
import { MetadataRoute } from 'next'

// 优先用环境变量,回退到真实部署域名
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-dir-final.vercel.app'

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' | undefined

// slug转换(与详情页保持一致)
function slugify(fullName: string): string {
  return fullName.replace(/\//g, '-')
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    '',
    '/blog',
    '/about',
    '/privacy-policy',
    '/terms-of-service',
  ]

  // Generate multilingual static pages
  const pages = LOCALES.flatMap(locale => {
    return staticPages.map(page => ({
      url: `${siteUrl}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${page}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: page === '' ? 1.0 : 0.8,
    }))
  })

  // 工具详情页(程序化SEO核心:44个工具×3语=132个可索引URL)
  const toolPages = LOCALES.flatMap(locale => {
    return tools.map(tool => ({
      url: `${siteUrl}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}/tool/${slugify(tool.fullName)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.9,
    }))
  })

  const blogPosts = await Promise.all(
    LOCALES.map(async (locale) => {
      const { posts } = await getPosts(locale)
      return posts.map(post => ({
        url: `${siteUrl}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}/blog${post.slug}`,
        lastModified: post.metadata.updatedAt || post.date,
        changeFrequency: 'daily' as const,
        priority: 0.7,
      }))
    })
  ).then(results => results.flat())

  return [
    ...pages,
    ...toolPages,
    ...blogPosts,
  ]
}