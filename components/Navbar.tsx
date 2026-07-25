"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Bilingual from "@/components/Bilingual";
import LanguageToggle from "@/components/LanguageToggle";

const navItems = [
  { href: "/", label: { en: "Home", zh: "首页" } },
  { href: "/service-areas", label: { en: "Service Areas", zh: "服务区域" } },
  { href: "/about", label: { en: "About", zh: "关于我们" } },
  // { href: "/blog", label: "Articles" },
  { href: "/quote", label: { en: "Get a Quote", zh: "获取报价" } },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="text-xl font-bold text-gray-950 sm:text-2xl">
            Clean<span className="text-green-700">Prime</span>
          </Link>
          <div className="lg:hidden">
            <LanguageToggle />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-2.5 py-2 text-sm font-medium transition sm:px-3
                  ${
                    pathname === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-950"
                  }`}
              >
                <Bilingual en={item.label.en} zh={item.label.zh} />
              </Link>
            ))}
          </div>
          <div className="hidden lg:block">
            <LanguageToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
