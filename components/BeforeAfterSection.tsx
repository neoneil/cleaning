import Image from "next/image";
import Link from "next/link";
import { beforeAfterItems } from "@/app/data/beforeAfter";

export default function BeforeAfterSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Before &amp; After
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            See the Difference
          </h2>
          <p className="mt-4 text-base text-gray-600">
            Real cleaning results from homes we’ve worked on across Melbourne.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {beforeAfterItems.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="relative">
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
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/quote"
            className="inline-flex rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
}