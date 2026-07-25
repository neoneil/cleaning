import Link from "next/link";
import Navbar from "@/components/Navbar";
import Bilingual from "@/components/Bilingual";
import { suburbs } from "@/app/data/suburbs";

export const metadata = {
  title: "Service Areas | CleanPrime",
  description:
    "Explore the suburbs we service across Melbourne's south-east, including Berwick, Narre Warren, Cranbourne, Officer, and Pakenham.",
};

export default function ServiceAreasPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white text-gray-950">
        <section className="border-b border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-normal text-green-700 sm:text-sm">
              <Bilingual en="Service Areas" zh="服务区域" />
            </p>
            <h1 className="max-w-3xl text-3xl font-semibold sm:text-4xl">
              <Bilingual
                en="Cleaning services across Melbourne's south-east"
                zh="覆盖墨尔本东南区的清洁服务"
              />
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-700 sm:text-base">
              <Bilingual
                en="Choose your suburb below to see where we commonly work. We may be able to help nearby areas as well."
                zh="您可以从下方选择常见服务区域。若您在附近 suburb，也欢迎提交信息咨询。"
              />
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {suburbs.map((suburb) => (
              <Link
                key={suburb.slug}
                href={`/cleaning/${suburb.slug}`}
                className="rounded-lg border border-gray-200 p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md"
              >
                <h2 className="text-lg font-semibold text-gray-950">{suburb.name}</h2>
                <p className="mt-3 text-sm leading-6 text-gray-700">
                  <Bilingual en={suburb.intro} zh={suburb.introZh} />
                </p>
                <span className="mt-5 inline-block text-sm font-semibold text-green-700">
                  <Bilingual en="View area" zh="查看区域" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              <Bilingual en="Need cleaning services in your area?" zh="您的区域需要清洁服务吗？" />
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-700 sm:text-base">
              <Bilingual
                en="Tell us about your property and we will provide a clear quote. Photos are optional, but they help us estimate faster."
                zh="告诉我们您的房屋情况，我们会提供清楚的报价。照片不是必须，但有助于更快估价。"
              />
            </p>

            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-md bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                <Bilingual en="Get a Free Quote" zh="获取免费报价" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:border-gray-400 hover:bg-gray-100"
              >
                <Bilingual en="Learn More About Us" zh="了解我们" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
