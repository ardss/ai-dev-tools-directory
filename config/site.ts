import { SiteConfig } from "@/types/siteConfig";

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ai-dir-final.vercel.app";

export const SOURCE_CODE_URL = "https://github.com/ardss/ai-dev-tools-directory";

const GITHUB_URL = 'https://github.com/ardss/ai-dev-tools-directory'

export const siteConfig: SiteConfig = {
  name: "AI Dev Tools",
  tagLine: 'Best AI Tools for Developers',
  description:
    "A curated directory of the best AI tools for developers — coding agents, browser automation, RAG, multi-agent frameworks, MCP and more. Open-source, ranked by GitHub stars, updated regularly.",
  url: BASE_URL,
  authors: [
    {
      name: "ardss",
      url: "https://github.com/ardss",
    }
  ],
  creator: '@ardss',
  socialLinks: {
    github: GITHUB_URL,
  },
  themeColors: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  defaultNextTheme: 'system', // next-theme option: system | dark | light
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png", // apple-touch-icon.png
  },
}
