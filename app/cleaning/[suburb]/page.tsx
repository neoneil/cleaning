import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Bilingual from "@/components/Bilingual";
import { suburbs, getSuburb } from "@/app/data/suburbs";

type Props = {
  params: Promise<{ suburb: string }>;
};

const services = [
  { en: "House Cleaning", zh: "家庭清洁" },
  { en: "Regular Cleaning", zh: "定期清洁" },
  { en: "Deep Cleaning", zh: "深度清洁" },
  { en: "End of Lease Cleaning", zh: "退租清洁" },
  { en: "Apartment Cleaning", zh: "公寓清洁" },
  { en: "Move In / Move Out Cleaning", zh: "搬入/搬出清洁" },
];

const reasons = [
  { en: "Husband-and-wife team", zh: "夫妻团队直接服务" },
  { en: "5 years of cleaning experience", zh: "5 年清洁经验" },
  { en: "Reliable and punctual", zh: "可靠准时" },
  { en: "Strong attention to detail", zh: "注重细节" },
  { en: "Friendly and clear communication", zh: "沟通友好清楚" },
];

export function generateStaticParams() {
  return suburbs.map((s) => ({
    suburb: s.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { suburb } = await params;
  const data = getSuburb(suburb);

  if (!data) {
    return {
      title: "Cleaning Services | CleanPrime",
      description: "Professional cleaning services in Melbourne.",
    };
  }

  return {
    title: `Cleaning Services in ${data.name} | CleanPrime`,
    description: data.intro,
  };
}

export default async function SuburbPage({ params }: Props) {
  const { suburb } = await params;
  const data = getSuburb(suburb);

  if (!data) return notFound();

  return (
    <>
      <Navbar />

      <main className="bg-white text-gray-950">
        <section className="border-b border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-normal text-green-700 sm:text-sm">
              <Bilingual en="Local Cleaning Service" zh="本地清洁服务" />
            </p>
            <h1 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
              <Bilingual
                en={`Professional cleaning services in ${data.name}`}
                zh={`${data.name} 专业清洁服务`}
              />
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-700 sm:text-base">
              <Bilingual en={data.intro} zh={data.introZh} />
            </p>

            <Link
              href="/quote"
              className="mt-6 inline-flex rounded-md bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <Bilingual en="Get a Free Quote" zh="获取免费报价" />
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold">
            <Bilingual
              en={`Our cleaning services in ${data.name}`}
              zh={`${data.name} 可预约服务`}
            />
          </h2>

          <ul className="mt-6 grid gap-3 text-sm text-gray-700 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li
                key={service.en}
                className="rounded-lg border border-gray-200 bg-white px-4 py-3"
              >
                <Bilingual en={service.en} zh={service.zh} />
              </li>
            ))}
          </ul>
        </section>

        <section className="border-y border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold">
              <Bilingual en="Why choose Vivi & Chi" zh="为什么选择 Vivi 和 Chi" />
            </h2>

            <ul className="mt-6 grid gap-3 text-sm text-gray-700 sm:grid-cols-2 lg:grid-cols-3">
              {reasons.map((reason) => (
                <li key={reason.en} className="flex gap-3 rounded-lg bg-white px-4 py-3 ring-1 ring-gray-200">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-700" />
                  <span>
                    <Bilingual en={reason.en} zh={reason.zh} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold">
            <Bilingual en="Nearby areas we also service" zh="附近服务区域" />
          </h2>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {data.nearby.map((area) => (
              <span
                key={area}
                className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700"
              >
                {area}
              </span>
            ))}
          </div>
        </section>

        <section className="border-t border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold">
              <Bilingual
                en={`Looking for cleaning in ${data.name}?`}
                zh={`需要 ${data.name} 清洁服务吗？`}
              />
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-700 sm:text-base">
              <Bilingual
                en="Send us your details and we will provide a clear, simple quote."
                zh="提交您的房屋信息，我们会提供清楚、简单的报价。"
              />
            </p>

            <Link
              href="/quote"
              className="mt-6 inline-flex rounded-md bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <Bilingual en="Request a Quote" zh="申请报价" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
