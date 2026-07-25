import Navbar from "@/components/Navbar";
import Bilingual from "@/components/Bilingual";

export const metadata = {
  title: "About Us | CleanPrime",
  description:
    "Meet CleanPrime, a reliable husband-and-wife cleaning team with 5 years of hands-on experience delivering detail-focused cleaning services.",
};

const cards = [
  {
    title: { en: "Our Story", zh: "我们的故事" },
    body: {
      en: "We are a husband-and-wife cleaning team who believe a clean home brings comfort, peace of mind, and more time for the things that matter. Over the past five years, we have worked with different households and property types, always aiming to provide honest, dependable, and high-quality service.",
      zh: "我们是一对夫妻清洁团队，相信干净的家能带来舒适、安心，也能把时间留给更重要的事情。过去五年，我们服务过不同家庭和房屋类型，一直坚持诚实、可靠和高质量的服务。",
    },
  },
  {
    title: { en: "Our Strengths", zh: "我们的优势" },
    body: {
      en: "Clients value us for being reliable, punctual, hardworking, and easy to communicate with. We pay attention to detail, respect each home as if it were our own, and complete every job with care and consistency.",
      zh: "客户认可我们的可靠、准时、认真和好沟通。我们重视细节，尊重每一个家庭，并用稳定负责的方式完成每一次清洁。",
    },
  },
  {
    title: { en: "Who We Help", zh: "适合哪些客户" },
    body: {
      en: "We support busy families, working professionals, renters, landlords, and property managers who need dependable cleaning they can count on.",
      zh: "我们服务忙碌家庭、上班族、租客、房东和物业管理人员，适合需要稳定、可信赖清洁服务的客户。",
    },
  },
];

const reasons = [
  { en: "Husband-and-wife team with 5 years of practical cleaning experience", zh: "夫妻团队，拥有 5 年实际清洁经验" },
  { en: "Reliable, punctual, and respectful service", zh: "可靠、准时，并尊重客户家庭" },
  { en: "Strong attention to detail in every room", zh: "每个房间都注重细节" },
  { en: "Clear and friendly communication from quote to completion", zh: "从报价到完成，全程沟通清楚友好" },
  { en: "Suitable for regular, one-off, and end of lease cleaning", zh: "适合定期、单次和退租清洁" },
  { en: "A personalised service from real people who care about quality", zh: "真人负责、重视质量的个性化服务" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white text-gray-950">
        <section className="border-b border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
            <p className="mb-3 text-xs font-semibold uppercase tracking-normal text-green-700 sm:text-sm">
              <Bilingual en="About CleanPrime" zh="关于 CleanPrime" />
            </p>
            <h1 className="max-w-3xl text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
              <Bilingual
                en="Meet Vivi & Chi, your reliable husband-and-wife cleaning team with 5 years of experience"
                zh="认识 Vivi 和 Chi，一对拥有 5 年经验的可靠夫妻清洁团队"
              />
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-700 sm:text-base">
              <Bilingual
                en="We provide practical, detail-focused cleaning for homes, rentals, and busy households across Melbourne."
                zh="我们为墨尔本家庭、出租房和忙碌住户提供实用、细致、可靠的清洁服务。"
              />
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-4 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
          {cards.map((card) => (
            <div key={card.title.en} className="rounded-lg border border-gray-200 p-5 shadow-sm">
              <h2 className="text-lg font-semibold">
                <Bilingual en={card.title.en} zh={card.title.zh} />
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-700">
                <Bilingual en={card.body.en} zh={card.body.zh} />
              </p>
            </div>
          ))}
        </section>

        <section className="border-t border-gray-200 bg-gray-50">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                <Bilingual en="Why clients choose us" zh="为什么客户选择我们" />
              </h2>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-gray-700">
                {reasons.map((reason) => (
                  <li key={reason.en} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-700" />
                    <span>
                      <Bilingual en={reason.en} zh={reason.zh} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-xl font-semibold">
                <Bilingual en="What you can expect from us" zh="您可以期待什么" />
              </h3>
              <p className="mt-4 text-sm leading-7 text-gray-700">
                <Bilingual
                  en="Good cleaning is about appearance, trust, consistency, and peace of mind. When you book with us, you work directly with a couple who care about doing the job properly, arriving on time, and keeping the experience simple."
                  zh="好的清洁不只是看起来干净，也包括信任、稳定和安心。预约我们时，您会直接和认真负责的夫妻团队沟通，我们重视准时、质量和简单顺畅的服务体验。"
                />
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
