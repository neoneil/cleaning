import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { suburbs, getSuburb } from "@/app/data/suburbs";

type Props = {
  params: Promise<{ suburb: string }>;
};

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

      <main className="bg-white">
        <section className="border-b bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="max-w-3xl text-3xl font-semibold sm:text-4xl  text-green-600">
              Professional Cleaning Services in {data.name}
            </h1>

            <p className="mt-5 max-w-2xl text-gray-700">{data.intro}</p>

            <Link
              href="/quote"
              className="mt-6 inline-block rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700"
            >
              Get a Free Quote
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold  text-green-600">
            Our cleaning services in {data.name}
          </h2>

          <ul className="mt-6 space-y-3 text-gray-700">
            <li>• House Cleaning</li>
            <li>• Regular Cleaning</li>
            <li>• Deep Cleaning</li>
            <li>• End of Lease Cleaning</li>
            <li>• Apartment Cleaning</li>
            <li>• Move In / Move Out Cleaning</li>
          </ul>
        </section>

        <section className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold  text-green-600">Why choose Vivi & Chi</h2>

            <ul className="mt-6 space-y-3 text-gray-700">
              <li>• Husband-and-wife team</li>
              <li>• 5 years of cleaning experience</li>
              <li>• Reliable and punctual</li>
              <li>• Strong attention to detail</li>
              <li>• Friendly and clear communication</li>
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold  text-green-600">
            Nearby areas we also service
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {data.nearby.map((area) => (
              <span
                key={area}
                className="rounded-full border px-4 py-2 text-sm text-gray-700"
              >
                {area}
              </span>
            ))}
          </div>
        </section>

        <section className="bg-green-50">
          <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold  text-gray-700">
              Looking for cleaning in {data.name}?
            </h2>

            <p className="mt-4 text-gray-700">
              Send us your details and we’ll provide a clear and simple quote.
            </p>

            <Link
              href="/quote"
              className="mt-6 inline-block rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700"
            >
              Request a Quote
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}