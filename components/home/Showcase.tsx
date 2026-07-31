import { ArrowUpRightIcon, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { tools as allTools, categories } from "@/data/tools";

// star数字格式化: 82600 -> "82.6k", 1230000 -> "1.2m"
function formatStars(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

export default function Showcase() {
  const t = useTranslations("Showcase");
  const locale = useLocale();

  return (
    <section id="showcase" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 scroll-mt-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-gray-200 sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {t("description")}
        </p>
      </div>

      <div className="space-y-12">
        {categories.map((cat) => {
          const items = allTools.filter((i) => i.category === cat.id);
          if (items.length === 0) return null;
          const catName = locale === "zh" ? cat.zh : locale === "ja" ? cat.ja : cat.en;
          return (
            <div key={cat.id}>
              <div className="flex items-center gap-3 mb-5">
                <h3 className="text-xl font-bold text-slate-900 dark:text-gray-200">
                  {catName}
                </h3>
                <span className="text-sm text-slate-400 dark:text-slate-500">
                  {items.length} {locale === "zh" ? "个工具" : "tools"}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-base font-semibold text-slate-900 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.name}
                      </h4>
                      <span className="flex items-center gap-1 text-xs text-amber-500 font-medium shrink-0">
                        <Star className="w-3 h-3 fill-amber-500" />
                        {formatStars(item.stars)}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                      {item.desc}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                        {new URL(item.url).hostname}
                      </p>
                      <ArrowUpRightIcon className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
