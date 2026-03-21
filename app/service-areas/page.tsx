import Link from "next/link";
import Navbar from "@/components/Navbar";
import { suburbs } from "@/app/data/suburbs";

export const metadata = {
    title: "Service Areas | CleanPrime",
    description:
        "Explore the suburbs we service across Melbourne’s south-east, including Berwick, Narre Warren, Cranbourne, Officer, and Pakenham.",
};

export default function ServiceAreasPage() {
    return (
        <>
            <Navbar />

            <main className="bg-white text-gray-900">
                <section className="border-b bg-gray-50">
                    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
                            Service Areas
                        </p>
                        <h1 className="max-w-3xl text-3xl font-semibold sm:text-4xl text-gray-700">
                            Cleaning services across Melbourne’s south-east
                        </h1>
                        <p className="mt-5 max-w-2xl text-gray-700">
                            We provide professional cleaning services in selected suburbs
                            across Melbourne’s south-east. Choose your area below to learn
                            more.
                        </p>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
                        {suburbs.map((suburb) => (
                            <Link
                                key={suburb.slug}
                                href={`/cleaning/${suburb.slug}`}
                                className="rounded-2xl border p-6 shadow-sm transition hover:shadow-md "
                            >
                                <h2 className="text-xl font-semibold text-gray-700">
                                    {suburb.name}
                                </h2>
                                <p className="mt-3 text-sm leading-6 text-gray-700">
                                    {suburb.intro}
                                </p>
                                <span className="mt-5 inline-block text-sm font-medium text-green-700">
                                    View area →
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
                <section className="bg-green-50">
                    <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">

                        <h2 className="text-2xl font-semibold sm:text-3xl">
                            Need cleaning services in your area?
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-700 sm:text-base">
                            Tell us about your property and we’ll provide a clear, simple quote.
                            Upload photos if you can — it helps us give a faster and more accurate estimate.
                        </p>

                        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">

                            <Link
                                href="/quote"
                                className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-green-700"
                            >
                                Get a Free Quote
                            </Link>

                            <Link
                                href="/about"
                                className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold text-gray-800 transition hover:bg-white"
                            >
                                Learn More About Us
                            </Link>

                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}