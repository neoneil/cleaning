"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Articles" },
  { href: "/quote", label: "Get a Quote" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="text-2xl font-bold text-green-600">
          Clean<span className="text-gray-900">Prime</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-2 text-sm font-medium transition
                ${
                  pathname === item.href
                    ? "bg-green-600 text-white"
                    : "text-green-700 hover:bg-green-50 hover:text-green-800"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}