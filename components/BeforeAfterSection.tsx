import Image from "next/image";
import Link from "next/link";
import { beforeAfterItems } from "@/app/data/beforeAfter";
import Bilingual from "@/components/Bilingual";

export default function BeforeAfterSection() {
  return (
    <section className="border-y border-gray-200 bg-gray-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-normal text-green-700 sm:text-sm">
            <Bilingual en="Before & After" zh="清洁前后" />
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-gray-950 sm:text-3xl">
            <Bilingual en="Visible results, handled carefully" zh="看得见的清洁效果" />
          </h2>
          <p className="mt-4 text-sm leading-7 text-gray-700 sm:text-base">
            <Bilingual
              en="Real cleaning results from homes we have worked on across Melbourne."
              zh="以下是我们在墨尔本不同家庭中完成的真实清洁效果。"
            />
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {beforeAfterItems.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-950">
                  <Bilingual en={item.title} zh={item.titleZh} />
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-700">
                  <Bilingual en={item.description} zh={item.descriptionZh} />
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/quote"
            className="inline-flex rounded-md bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            <Bilingual en="Get a Free Quote" zh="获取免费报价" />
          </Link>
        </div>
      </div>
    </section>
  );
}
