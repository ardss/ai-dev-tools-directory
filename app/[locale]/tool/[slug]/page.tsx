import { ArrowUpRightIcon, Star, Github } from "lucide-react";
import { Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { tools, categories } from "@/data/tools";
import Link from "next/link";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

// slug转换: "n8n-io/n8n" -> "n8n-io-n8n"(URL安全,避免/冲突)
function slugify(fullName: string): string {
  return fullName.replace(/\//g, "-");
}

// 静态生成所有工具详情页(程序化SEO核心:每个工具一个可索引页面)
export function generateStaticParams() {
  return tools.map((tool) => ({ slug: slugify(tool.fullName) }));
}

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const tool = tools.find((t) => slugify(t.fullName) === slug);
  if (!tool) return {};

  const title = `${tool.name} - Stars ${formatStars(tool.stars)} | AI Dev Tools`;
  const description = `${tool.name}: ${tool.desc}. GitHub stars: ${formatStars(tool.stars)}. Category: ${getCategoryName(tool.category, locale)}.`;
  return constructMetadata({
    title,
    description,
    locale,
    path: `/tool/${slug}`,
  });
}

function formatStars(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

function getCategoryName(catId: string, locale: Locale): string {
  const cat = categories.find((c) => c.id === catId);
  if (!cat) return catId;
  return locale === "zh" ? cat.zh : locale === "ja" ? cat.ja : cat.en;
}

export default async function ToolDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const tool = tools.find((t) => slugify(t.fullName) === slug);

  if (!tool) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Showcase" });
  const catName = getCategoryName(tool.category, locale);
  const [owner, repo] = tool.fullName.split("/");

  // 相关工具(同分类的其他工具)
  const related = tools
    .filter((x) => x.category === tool.category && x.fullName !== tool.fullName)
    .slice(0, 6);

  const stats = {
    totalTools: locale === "zh" ? `${tools.length} 个工具` : `${tools.length} tools`,
    explore: locale === "zh" ? "探索全部工具" : locale === "ja" ? "すべてのツールを見る" : "Explore all tools",
    relatedTitle: locale === "zh" ? "相关工具" : locale === "ja" ? "関連ツール" : "Related Tools",
    viewOnGithub: "View on GitHub",
    category: locale === "zh" ? "分类" : locale === "ja" ? "カテゴリ" : "Category",
    stars: "GitHub Stars",
    back: locale === "zh" ? "← 返回全部工具" : locale === "ja" ? "← すべてのツールへ" : "← Back to all tools",
  };

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      {/* 面包屑 */}
      <Link
        href="/#showcase"
        className="text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 mb-6 inline-block"
      >
        {stats.back}
      </Link>

      {/* 工具头部 */}
      <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-gray-200">
            {tool.name}
          </h1>
          <span className="flex items-center gap-1.5 text-amber-500 font-semibold shrink-0">
            <Star className="w-5 h-5 fill-amber-500" />
            {formatStars(tool.stars)}
          </span>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
          {tool.desc}
        </p>

        {/* 元信息 */}
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
            {stats.category}: {catName}
          </span>
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm">
            {owner}
          </span>
        </div>

        {/* CTA */}
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-xl font-medium transition-colors"
        >
          <Github className="w-5 h-5" />
          {stats.viewOnGithub}
          <ArrowUpRightIcon className="w-4 h-4" />
        </a>
      </div>

      {/* 统计 */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-center">
          <div className="text-2xl font-bold text-slate-900 dark:text-gray-200">
            {formatStars(tool.stars)}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">{stats.stars}</div>
        </div>
        <Link
          href="/#showcase"
          className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-center hover:border-blue-500 transition-colors"
        >
          <div className="text-2xl font-bold text-slate-900 dark:text-gray-200">
            {tools.length}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">{stats.totalTools}</div>
        </Link>
      </div>

      {/* 相关工具 */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-gray-200 mb-4">
            {stats.relatedTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {related.map((r) => (
              <Link
                key={r.fullName}
                href={`/tool/${slugify(r.fullName)}`}
                className="group flex items-center justify-between p-3 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors"
              >
                <div className="min-w-0">
                  <div className="font-medium text-slate-900 dark:text-gray-200 group-hover:text-blue-600 truncate">
                    {r.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {r.desc}
                  </div>
                </div>
                <span className="flex items-center gap-1 text-xs text-amber-500 shrink-0 ml-2">
                  <Star className="w-3 h-3 fill-amber-500" />
                  {formatStars(r.stars)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
