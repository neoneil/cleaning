import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Cleaning Articles | CleanPrime",
  description:
    "Read practical cleaning tips, moving-out cleaning advice, and home care articles from CleanPrime.",
};

const placeholderPosts = [
  {
    title: "How Often Should You Deep Clean a House?",
    excerpt:
      "A practical guide to deep cleaning frequency for busy households, renters, and families.",
    slug: "#",
  },
  {
    title: "End of Lease Cleaning Checklist for Melbourne Tenants",
    excerpt:
      "What property managers often notice, and how to prepare your home before final inspection.",
    slug: "#",
  },
  {
    title: "House vs Apartment Cleaning: What Changes?",
    excerpt:
      "The main differences in time, detail, and planning between cleaning different property types.",
    slug: "#",
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white text-gray-900">
        <section className="border-b bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Articles
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Helpful cleaning tips, guides, and service advice
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
              This page is ready for your future SEO articles. Later, you can
              connect your existing blog module here and list real posts from
              your database.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {placeholderPosts.map((post) => (
              <article
                key={post.title}
                className="rounded-2xl border p-6 shadow-sm transition hover:shadow-md"
              >
                <p className="text-sm font-medium text-gray-500">Cleaning Guide</p>
                <h2 className="mt-3 text-xl font-semibold leading-snug">
                  {post.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
                  {post.excerpt}
                </p>
                <Link
                  href={post.slug}
                  className="mt-6 inline-block text-sm font-semibold text-black underline-offset-4 hover:underline"
                >
                  Read article
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}