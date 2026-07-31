import { ArrowUpRightIcon, Star, Github, Scale } from "lucide-react";
import { Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { tools, categories } from "@/data/tools";
import Link from "next/link";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

// slug转换(与详情页保持一致)
function slugify(fullName: string): string {
  return fullName.replace(/\//g, "-");
}

// F1 MVP: 程序化对比页(原则 2 先卖再做 - 零数据成本生成大量高商业意图页面)
// 只生成同分类内的对比(质量更高、商业意图更强、避免无意义的跨类对比)
// 页面量 = Σ C(n_i, 2) per category,约 200-400 页(高质量,非注水)
export function generateStaticParams() {
  const params: { a: string; b: string; locale: string }[] = [];
  for (const cat of categories) {
    const inCat = tools.filter((t) => t.category === cat.id);
    // 同分类两两组合 C(n,2)
    for (let i = 0; i < inCat.length; i++) {
      for (let j = i + 1; j < inCat.length; j++) {
        const a = slugify(inCat[i].fullName);
        const b = slugify(inCat[j].fullName);
        // locale 由 [locale] 段提供,这里只产 a/b
        params.push({ a, b, locale: "en" });
      }
    }
  }
  // 返回去重后的 a/b 组合(locale 段会自动展开)
  const seen = new Set<string>();
  return params.filter((p) => {
    const k = `${p.a}|${p.b}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

type Props = {
  params: Promise<{ locale: Locale; a: string; b: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, a, b } = await params;
  const toolA = tools.find((t) => slugify(t.fullName) === a);
  const toolB = tools.find((t) => slugify(t.fullName) === b);
  if (!toolA || !toolB) return {};

  const title =
    locale === "zh"
      ? `${toolA.name} vs ${toolB.name} - 哪个更好? | AI Dev Tools`
      : `${toolA.name} vs ${toolB.name} - Which is Better? | AI Dev Tools`;
  const description =
    locale === "zh"
      ? `${toolA.name} vs ${toolB.name} 详细对比:GitHub Stars、分类、特点。帮你快速决定选哪个。`
      : `${toolA.name} vs ${toolB.name} comparison: GitHub stars, category, features. Decide which one to use.`;
  return constructMetadata({
    title,
    description,
    locale,
    path: `/compare/${a}/${b}`,
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

export default async function ComparePage({ params }: Props) {
  const { locale, a, b } = await params;
  const toolA = tools.find((t) => slugify(t.fullName) === a);
  const toolB = tools.find((t) => slugify(t.fullName) === b);

  if (!toolA || !toolB) {
    notFound();
  }

  // 确保 A 是 stars 更高的(稳定排序,便于用户认知)
  const [first, second] =
    toolA.stars >= toolB.stars ? [toolA, toolB] : [toolB, toolA];

  const catNameA = getCategoryName(first.category, locale);
  const catNameB = getCategoryName(second.category, locale);
  const sameCategory = first.category === second.category;

  const isZh = locale === "zh";
  const txt = {
    title: isZh ? `${first.name} vs ${second.name}` : `${first.name} vs ${second.name}`,
    subtitle: isZh
      ? "详细对比,帮你决定选哪个"
      : "Detailed comparison to help you decide",
    back: isZh ? "← 返回全部工具" : "← Back to all tools",
    stars: "GitHub Stars",
    category: isZh ? "分类" : "Category",
    overview: isZh ? "概述" : "Overview",
    repo: isZh ? "仓库" : "Repository",
    viewOnGithub: "View on GitHub",
    vsLabel: isZh ? "对比" : "VS",
    winner: isZh ? "★ 更受欢迎" : "★ More Popular",
    sameCat: isZh ? "同类工具" : "Same Category",
    diffCat: isZh ? "不同分类" : "Different Categories",
    moreCompare: isZh ? `${first.name} 的更多对比` : `More comparisons for ${first.name}`,
    relatedCompare: isZh ? `${second.name} 的更多对比` : `More comparisons for ${second.name}`,
  };

  // 相关对比(同分类的其他工具 vs first/second)
  const pool = sameCategory
    ? tools.filter((t) => t.category === first.category && t.fullName !== first.fullName && t.fullName !== second.fullName)
    : tools.filter((t) => t.fullName !== first.fullName && t.fullName !== second.fullName);
  const moreForFirst = pool.filter((t) => t.fullName !== first.fullName).slice(0, 4);
  const moreForSecond = pool.filter((t) => t.fullName !== second.fullName).slice(0, 4);

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      {/* JSON-LD: 对比页用 Article + 提及两个 SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${first.name} vs ${second.name}`,
            description: txt.subtitle,
            about: [
              { "@type": "SoftwareApplication", name: first.name, url: first.url },
              { "@type": "SoftwareApplication", name: second.name, url: second.url },
            ],
          }),
        }}
      />

      <Link
        href="/#showcase"
        className="text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 mb-6 inline-block"
      >
        {txt.back}
      </Link>

      {/* 标题区 */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-gray-200">
          {first.name} <span className="text-blue-500 mx-2">{txt.vsLabel}</span> {second.name}
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">{txt.subtitle}</p>
      </div>

      {/* 对比卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Tool A */}
        <ToolCompareCard tool={first} catName={catNameA} isWinner txt={txt} locale={locale} />
        {/* Tool B */}
        <ToolCompareCard tool={second} catName={catNameB} txt={txt} locale={locale} />
      </div>

      {/* 分类关系提示 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-8 flex items-center gap-3">
        <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
        <p className="text-sm text-blue-800 dark:text-blue-200">
          {sameCategory
            ? isZh
              ? `两者同属「${catNameA}」分类,是直接竞品。`
              : `Both belong to the "${catNameA}" category — they are direct competitors.`
            : isZh
              ? `两者属于不同分类(${catNameA} / ${catNameB}),定位不同,常配合使用。`
              : `They are in different categories (${catNameA} / ${catNameB}) — different purposes, often used together.`}
        </p>
      </div>

      {/* 快速判断 */}
      <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-gray-200 mb-4">
          {isZh ? "快速判断" : "Quick Take"}
        </h2>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          {first.stars >= second.stars * 2 ? (
            <li>
              • <strong>{first.name}</strong> {isZh ? "的社区规模显著更大" : "has a significantly larger community"} ({formatStars(first.stars)} vs {formatStars(second.stars)} stars){isZh ? ",生态更成熟。" : ", more mature ecosystem."}
            </li>
          ) : (
            <li>
              • {isZh ? "两者社区规模相近" : "Both have similar community sizes"} ({formatStars(first.stars)} vs {formatStars(second.stars)} stars){isZh ? ",选哪个看具体需求。" : ", choose based on your specific needs."}
            </li>
          )}
          {sameCategory && (
            <li>
              • {isZh ? "同分类竞品" : "Same-category competitors"}{isZh ? ",建议看官方文档和最近更新活跃度。" : ", check official docs and recent commit activity."}
            </li>
          )}
          <li>
            • {isZh ? `看详情页:` : `See detail pages: `}
            <Link href={`/tool/${slugify(first.fullName)}`} className="text-blue-600 dark:text-blue-400 hover:underline">{first.name}</Link>
            {" / "}
            <Link href={`/tool/${slugify(second.fullName)}`} className="text-blue-600 dark:text-blue-400 hover:underline">{second.name}</Link>
          </li>
        </ul>
      </div>

      {/* 更多对比 */}
      {(moreForFirst.length > 0 || moreForSecond.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {moreForFirst.length > 0 && (
            <div>
              <h3 className="font-bold text-slate-900 dark:text-gray-200 mb-3">{txt.moreCompare}</h3>
              <div className="space-y-2">
                {moreForFirst.map((t) => (
                  <CompareLink key={t.fullName} from={first} to={t} txt={txt} />
                ))}
              </div>
            </div>
          )}
          {moreForSecond.length > 0 && (
            <div>
              <h3 className="font-bold text-slate-900 dark:text-gray-200 mb-3">{txt.relatedCompare}</h3>
              <div className="space-y-2">
                {moreForSecond.map((t) => (
                  <CompareLink key={t.fullName} from={second} to={t} txt={txt} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function ToolCompareCard({
  tool,
  catName,
  isWinner,
  txt,
  locale,
}: {
  tool: (typeof tools)[number];
  catName: string;
  isWinner?: boolean;
  txt: Record<string, string>;
  locale: Locale;
}) {
  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 relative">
      {isWinner && (
        <span className="absolute -top-2 right-4 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-medium rounded-full">
          {txt.winner}
        </span>
      )}
      <div className="flex items-start justify-between gap-3 mb-3">
        <Link href={`/tool/${slugify(tool.fullName)}`} className="group">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-200 group-hover:text-blue-600">
            {tool.name}
          </h2>
        </Link>
        <span className="flex items-center gap-1 text-amber-500 font-semibold shrink-0">
          <Star className="w-4 h-4 fill-amber-500" />
          {formatStars(tool.stars)}
        </span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{tool.desc}</p>
      <div className="flex flex-wrap gap-2 mb-4 text-xs">
        <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full">
          {txt.category}: {catName}
        </span>
        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
          {tool.fullName}
        </span>
      </div>
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600"
      >
        <Github className="w-4 h-4" />
        {txt.viewOnGithub}
        <ArrowUpRightIcon className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

function CompareLink({
  from,
  to,
  txt,
}: {
  from: (typeof tools)[number];
  to: (typeof tools)[number];
  txt: Record<string, string>;
}) {
  return (
    <Link
      href={`/compare/${slugify(from.fullName)}/${slugify(to.fullName)}`}
      className="group flex items-center justify-between p-3 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors"
    >
      <span className="font-medium text-slate-900 dark:text-gray-200 group-hover:text-blue-600 truncate">
        {from.name} vs {to.name}
      </span>
      <span className="flex items-center gap-1 text-xs text-amber-500 shrink-0 ml-2">
        <Star className="w-3 h-3 fill-amber-500" />
        {formatStars(to.stars)}
      </span>
    </Link>
  );
}
