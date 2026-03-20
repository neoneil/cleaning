import Navbar from "@/components/Navbar";

export const metadata = {
  title: "About Us | CleanPrime",
  description:
    "Meet CleanPrime, a reliable husband-and-wife cleaning team with 5 years of hands-on experience delivering detail-focused cleaning services.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white text-gray-900">
        <section className="border-b bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              About CleanPrime
            </p>
            <h1 className="max-w-3xl text-2xl font-semibold leading-snug sm:text-3xl lg:text-4xl">
              Meet <span className="text-green-600">Vivi & Chi</span> — your reliable husband-and-wife cleaning team with 5 years of experience
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-700 sm:text-lg">
              We are a dedicated couple who have been providing reliable professional cleaning
              services for over five years. 
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="rounded-2xl border p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Our Story</h2>
            <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
              We are a husband-and-wife cleaning team who believe that a clean home
              brings comfort, peace of mind, and more time for the things that matter.
              Over the past five years, we have worked closely with clients from
              different households and property types, always aiming to provide honest,
              dependable, and high-quality service.
            </p>
          </div>

          <div className="rounded-2xl border p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Our Strengths</h2>
            <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
              Clients value us for being reliable, punctual, hardworking, and easy to
              communicate with. We pay attention to detail, respect each home as if it
              were our own, and always aim to complete every job with care and
              consistency.
            </p>
          </div>

          <div className="rounded-2xl border p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Who We Help</h2>
            <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
              We support busy families, working professionals, renters, landlords, and
              property managers who need dependable cleaning they can count on. Whether
              it is regular home cleaning, a one-off deep clean, or preparing a property
              for inspection, we are here to help.
            </p>
          </div>
        </section>

        <section className="bg-gray-50">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Why clients choose us</h2>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-gray-600 sm:text-base">
                <li>• Husband-and-wife team with 5 years of practical cleaning experience</li>
                <li>• Reliable, punctual, and respectful service</li>
                <li>• Strong attention to detail in every room</li>
                <li>• Clear and friendly communication from quote to completion</li>
                <li>• Suitable for regular, one-off, and end of lease cleaning</li>
                <li>• A personalised service from real people who care about quality</li>
              </ul>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">What you can expect from us</h3>
              <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
                We believe good cleaning is not only about appearance, but also about
                trust, consistency, and peace of mind. When you book with us, you are
                working directly with a couple who care about doing the job properly,
                arriving on time, and making the whole experience simple and stress-free.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}