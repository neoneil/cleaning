import Link from "next/link";
import Image from "next/image";
export default function Hero() {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Melbourne Cleaning Service
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl text-gray-700 lg:text-5xl">
            Professional cleaning for homes, rentals, and busy households
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
            Reliable cleaning support with clear communication, practical
            service options, and a simple quote process.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Get a Free Quote
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative h-48 overflow-hidden rounded-2xl sm:h-64">
            <Image
              src="/images/hero-1.jpg"
              alt="Professional house cleaning"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative h-48 overflow-hidden rounded-2xl sm:h-64">
            <Image
              src="/images/hero-2.jpg"
              alt="Kitchen cleaning service"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative col-span-2 h-56 overflow-hidden rounded-2xl sm:h-72">
            <Image
              src="/images/hero-3.jpg"
              alt="Clean living space"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}