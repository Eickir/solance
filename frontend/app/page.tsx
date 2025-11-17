// frontend/app/page.tsx
"use client";

import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "@/components/wallet/WalletButton";

export default function HomePage() {
  const { connected } = useWallet();

  return (
    <div className="flex flex-col gap-10 mt-10">
      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">Solance</h1>
        <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base">
          A decentralized freelance platform on Solana. Clients create on-chain
          contracts, contractors submit proposals, funds are locked in a vault
          and released only when the work is done.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3">
          <WalletButton />
          {!connected && (
            <p className="text-xs text-slate-400">
              Connect your wallet to start creating contracts or sending
              proposals.
            </p>
          )}
        </div>
      </section>

      {/* Double CTA */}
      <section className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <div className="border border-slate-800 rounded-xl p-5 flex flex-col gap-3 bg-slate-950/60">
          <h2 className="font-semibold text-lg">I want to hire (Client)</h2>
          <p className="text-sm text-slate-300">
            Create an on-chain mission, describe your needs, and later choose a
            proposal. Funds will be locked in a vault and only released when the
            work is done.
          </p>
          <Link
            href="/contracts/new"
            className={`mt-2 inline-flex justify-center items-center px-4 py-2 rounded-md text-sm font-medium
            ${
              connected
                ? "bg-indigo-500 hover:bg-indigo-600"
                : "bg-slate-700 cursor-not-allowed"
            }`}
          >
            {connected ? "Create a contract" : "Connect wallet to create"}
          </Link>
        </div>

        <div className="border border-slate-800 rounded-xl p-5 flex flex-col gap-3 bg-slate-950/60">
          <h2 className="font-semibold text-lg">I want to work (Contractor)</h2>
          <p className="text-sm text-slate-300">
            Register as a contractor, browse available contracts, submit
            proposals and get paid automatically once the client confirms your
            work.
          </p>
          <Link
            href="/dashboard"
            className={`mt-2 inline-flex justify-center items-center px-4 py-2 rounded-md text-sm font-medium
            ${
              connected
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-slate-700 cursor-not-allowed"
            }`}
          >
            {connected ? "Go to dashboard" : "Connect wallet to continue"}
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-3xl mx-auto space-y-3 text-sm text-slate-300">
        <h2 className="font-semibold text-base">How Solance works</h2>
        <ol className="list-decimal pl-4 space-y-1">
          <li>Client registers on-chain and creates a contract (mission).</li>
          <li>Contractors register and submit proposals with their price.</li>
          <li>Client chooses a proposal: funds are locked in a contract vault.</li>
          <li>Contractor delivers the work and marks it as done.</li>
          <li>Client confirms and claims payment from the vault.</li>
        </ol>
      </section>
    </div>
  );
}
