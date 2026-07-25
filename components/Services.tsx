import Bilingual from "@/components/Bilingual";

const services = [
  {
    title: { en: "House Cleaning", zh: "家庭清洁" },
    detail: {
      en: "Whole-home cleaning for kitchens, bathrooms, bedrooms, and living areas, planned around the way your household actually runs.",
      zh: "覆盖厨房、浴室、卧室和客厅等主要区域，按照家庭实际需求安排清洁重点。",
    },
  },
  {
    title: { en: "Regular Cleaning", zh: "定期清洁" },
    detail: {
      en: "Weekly or fortnightly cleaning that keeps the home consistently fresh with clear scheduling and reliable arrival times.",
      zh: "支持每周或每两周定期服务，时间安排清楚，帮助家里长期保持整洁。",
    },
  },
  {
    title: { en: "Deep Cleaning", zh: "深度清洁" },
    detail: {
      en: "A more detailed clean for built-up dust, grease, soap marks, and hard-to-reach areas that need extra attention.",
      zh: "针对积尘、油污、水渍和难清洁区域进行更细致处理，适合阶段性彻底整理。",
    },
  },
  {
    title: { en: "End of Lease Cleaning", zh: "退租清洁" },
    detail: {
      en: "Detailed cleaning for rental handovers, with attention to the areas property managers commonly inspect.",
      zh: "面向退租交房场景，重点处理房东和中介常检查的区域，帮助交接更顺利。",
    },
  },
  {
    title: { en: "Apartment Cleaning", zh: "公寓清洁" },
    detail: {
      en: "Efficient cleaning for apartments and units, with careful work in compact rooms and high-traffic surfaces.",
      zh: "适合公寓和单元房，重点照顾紧凑空间、高频使用区域和共享表面。",
    },
  },
  {
    title: { en: "Move In / Move Out Cleaning", zh: "搬入/搬出清洁" },
    detail: {
      en: "Cleaning before move-in or after move-out so the property feels fresh, hygienic, and ready for its next stage.",
      zh: "搬入前或搬出后进行清洁整理，让房屋更干净卫生，方便进入下一阶段使用。",
    },
  },
];

export default function Services() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-normal text-green-700 sm:text-sm">
            <Bilingual en="Services" zh="服务项目" />
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-gray-950 sm:text-3xl">
            <Bilingual
              en="Cleaning services designed for real homes and real schedules"
              zh="贴合真实家庭和日常安排的清洁服务"
            />
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title.en}
              className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md"
            >
              <h3 className="text-base font-semibold text-gray-950 sm:text-lg">
                <Bilingual en={service.title.en} zh={service.title.zh} />
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-700">
                <Bilingual en={service.detail.en} zh={service.detail.zh} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
