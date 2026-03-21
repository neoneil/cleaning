import Link from "next/link";
import { suburbs } from "@/app/data/suburbs";

export default function ServiceAreas() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl font-semibold  text-green-600">
          Service Areas
        </h2>

        <p className="mt-3 text-gray-600">
          We provide cleaning services across Melbourne’s south-east suburbs.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {suburbs.map((s) => (
            <Link
              key={s.slug}
              href={`/cleaning/${s.slug}`}
              className="rounded-full border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}