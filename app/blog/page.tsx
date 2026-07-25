import Navbar from "@/components/Navbar";
import Link from "next/link";
import Bilingual from "@/components/Bilingual";

export const metadata = {
  title: "Cleaning Articles | CleanPrime",
  description:
    "Read practical cleaning tips, moving-out cleaning advice, and home care articles from CleanPrime.",
};

const placeholderPosts = [
  {
    title: { en: "How Often Should You Deep Clean a House?", zh: "家庭多久需要一次深度清洁？" },
    excerpt: {
      en: "A practical guide to deep cleaning frequency for busy households, renters, and families.",
      zh: "为忙碌家庭、租客和普通住户整理的深度清洁频率建议。",
    },
    slug: "#",
  },
  {
    title: {
      en: "End of Lease Cleaning Checklist for Melbourne Tenants",
      zh: "墨尔本租客退租清洁检查清单",
    },
    excerpt: {
      en: "What property managers often notice, and how to prepare your home before final inspection.",
      zh: "了解中介常检查的区域，以及 final inspection 前可以如何准备。",
    },
    slug: "#",
  },
  {
    title: { en: "House vs Apartment Cleaning: What Changes?", zh: "独立屋和公寓清洁有什么不同？" },
    excerpt: {
      en: "The main differences in time, detail, and planning between cleaning different property types.",
      zh: "不同房屋类型在清洁时间、重点和安排上的主要区别。",
    },
    slug: "#",
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white text-gray-950">
        <section className="border-b border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-normal text-green-700 sm:text-sm">
              <Bilingual en="Articles" zh="清洁文章" />
            </p>
            <h1 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
              <Bilingual
                en="Helpful cleaning tips, guides, and service advice"
                zh="实用清洁建议、指南和服务说明"
              />
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-700 sm:text-base">
              <Bilingual
                en="This page is ready for future SEO articles and practical customer resources."
                zh="这个页面可用于后续 SEO 文章和客户常见问题内容。"
              />
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {placeholderPosts.map((post) => (
              <article
                key={post.title.en}
                className="rounded-lg border border-gray-200 p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md"
              >
                <p className="text-sm font-medium text-green-700">
                  <Bilingual en="Cleaning Guide" zh="清洁指南" />
                </p>
                <h2 className="mt-3 text-xl font-semibold leading-snug">
                  <Bilingual en={post.title.en} zh={post.title.zh} />
                </h2>
                <p className="mt-4 text-sm leading-6 text-gray-700">
                  <Bilingual en={post.excerpt.en} zh={post.excerpt.zh} />
                </p>
                <Link
                  href={post.slug}
                  className="mt-6 inline-block text-sm font-semibold text-gray-950 underline-offset-4 hover:underline"
                >
                  <Bilingual en="Read article" zh="阅读文章" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
