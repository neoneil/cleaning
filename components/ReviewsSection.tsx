import { reviews } from "@/app/data/reviews";
import Bilingual from "@/components/Bilingual";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="text-lg leading-none text-amber-400"
      aria-label={`${rating} out of 5 stars`}
    >
      {"\u2605".repeat(rating)}
      <span className="text-gray-300">{"\u2605".repeat(5 - rating)}</span>
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-normal text-green-700 sm:text-sm">
            <Bilingual en="Google Reviews" zh="客户评价" />
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-gray-950 sm:text-3xl">
            <Bilingual en="What our clients say" zh="客户怎么评价我们" />
          </h2>
          <p className="mt-4 text-sm leading-7 text-gray-700 sm:text-base">
            <Bilingual
              en="Trusted by local families and households across Melbourne for reliable, friendly, and detail-focused cleaning."
              zh="墨尔本本地家庭选择我们，是因为服务可靠、沟通友好，并且注重细节。"
            />
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            >
              <Stars rating={review.rating} />
              <p className="mt-4 text-sm leading-7 text-gray-700">
                <Bilingual en={review.text} zh={review.textZh} />
              </p>

              <div className="mt-5">
                <p className="text-sm font-semibold text-gray-950">{review.name}</p>
                {review.location && (
                  <p className="text-sm text-gray-500">{review.location}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
