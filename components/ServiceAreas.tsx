import Link from "next/link";
import { suburbs } from "@/app/data/suburbs";
import Bilingual from "@/components/Bilingual";

export default function ServiceAreas() {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-950">
          <Bilingual en="Service Areas" zh="服务区域" />
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-700 sm:text-base">
          <Bilingual
            en="We provide cleaning services across Melbourne's south-east and eastern suburbs. These are common service areas, but we are not limited to these locations."
            zh="我们服务墨尔本东南区和东区多个 suburb。以下是常见服务区域，但实际可服务范围不限于这些地点。"
          />
        </p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {suburbs.map((s) => (
            <Link
              key={s.slug}
              href={`/cleaning/${s.slug}`}
              className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
