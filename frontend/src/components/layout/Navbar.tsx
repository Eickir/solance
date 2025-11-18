"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// Si tu as déjà un WalletMultiButton, décommente ça :
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/contracts/new", label: "Create Contract" },
  { href: "/contracts", label: "View Contracts" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo / title */}
        <Link href="/" className="flex items-center gap-2">
          <span className="rounded-full bg-zinc-900 px-2 py-1 text-xs font-semibold text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
            Solance
          </span>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Freelance escrow on Solana
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-4 text-sm">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-full px-3 py-1 transition-colors",
                  isActive
                    ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Wallet button (optionnel si tu l’utilises déjà ailleurs) */}
        {
        <div className="ml-4">
          <WalletMultiButton />
        </div>
        }
      </div>
    </header>
  );
}
