import Link from "next/link";
import Image from "next/image";
import Bilingual from "@/components/Bilingual";

export default function Hero() {
  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-normal text-green-700 sm:text-sm">
            <Bilingual en="Melbourne Cleaning Service" zh="墨尔本专业清洁服务" />
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-gray-950 sm:text-4xl lg:text-5xl">
            <Bilingual
              en="Professional cleaning for homes, rentals, and busy households"
              zh="为家庭、出租房和繁忙生活提供可靠清洁"
            />
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-gray-700 sm:text-base">
            <Bilingual
              en="Reliable cleaning support with clear communication, practical service options, and a simple quote process."
              zh="我们提供沟通清晰、安排灵活、报价流程简单的清洁服务，让每一次预约都更省心。"
            />
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-md bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <Bilingual en="Get a Free Quote" zh="获取免费报价" />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:border-gray-400 hover:bg-gray-100"
            >
              <Bilingual en="Learn More" zh="了解我们" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="relative h-36 overflow-hidden rounded-lg sm:h-60">
            <Image
              src="/images/hero-1.jpg"
              alt="Professional house cleaning"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="relative h-36 overflow-hidden rounded-lg sm:h-60">
            <Image
              src="/images/hero-2.jpg"
              alt="Kitchen cleaning service"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="relative col-span-2 hidden h-56 overflow-hidden rounded-lg sm:block sm:h-68">
            <Image
              src="/images/hero-3.jpg"
              alt="Clean living space"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
