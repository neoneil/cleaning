import { faqs } from "@/app/data/faqs";
import Bilingual from "@/components/Bilingual";

export default function FaqSection() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-normal text-green-700 sm:text-sm">
            <Bilingual en="Questions & Answers" zh="常见问题" />
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-gray-950 sm:text-3xl">
            <Bilingual
              en="Frequently asked cleaning questions"
              zh="客户常问的清洁问题"
            />
          </h2>
          <p className="mt-4 text-sm leading-7 text-gray-700 sm:text-base">
            <Bilingual
              en="Straight answers about service options, locations, quotes, and regular cleaning bookings."
              zh="关于服务项目、服务区域、报价和定期清洁预约的简明说明。"
            />
          </p>
        </div>

        <div className="mt-8 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-sm">
          {faqs.map((faq) => (
            <div key={faq.question} className="p-5 sm:p-6">
              <h3 className="text-base font-semibold leading-6 text-gray-950">
                <Bilingual en={faq.question} zh={faq.questionZh} />
              </h3>
              <p className="mt-3 text-sm leading-7 text-gray-700">
                <Bilingual en={faq.answer} zh={faq.answerZh} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
