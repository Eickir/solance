"use client";

import Link from "next/link";
import { WalletButton } from "@/components/wallet/WalletButton";

export function Navbar() {
  return (
    <header className="border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold">
          Solance
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <WalletButton />
        </nav>
      </div>
    </header>
  );
}
