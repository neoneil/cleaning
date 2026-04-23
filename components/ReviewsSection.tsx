import { reviews } from "@/app/data/reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="text-amber-400 text-lg leading-none tracking-tight"
      aria-label={`${rating} out of 5 stars`}
    >
      {"★".repeat(rating)}
      <span className="text-gray-300">
        {"★".repeat(5 - rating)}
      </span>
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Google Reviews
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-base text-gray-600">
            Trusted by local families and households across Melbourne for reliable,
            friendly, and detail-focused cleaning.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm"
            >
              <Stars rating={review.rating} />
              <p className="mt-4 text-sm leading-7 text-gray-700">
                “{review.text}”
              </p>

              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                {review.location && (
                  <p className="text-sm text-gray-500">{review.location}</p>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* <div className="mt-10 text-center">
          <a
            href="https://g.page/r/Cd_95Oq1t7iJEAI/review"
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full border border-gray-900 px-6 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-900 hover:text-white"
          >
            View More Reviews on Google
          </a>
        </div> */}
      </div>
    </section>
  );
}