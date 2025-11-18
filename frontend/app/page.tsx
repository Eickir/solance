"use client";

import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Home() {
  const { publicKey } = useWallet();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-3xl w-full space-y-8 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Solance – On-chain freelance contracts on Solana
          </h1>
          <p className="text-zinc-400 text-lg">
            Create missions as a client, receive proposals from contractors, lock
            SOL in a vault and release payment on-chain when the work is done.
          </p>

          {!publicKey ? (
            <p className="mt-4 text-sm text-zinc-400">
              Connect your wallet with the button in the header to get started.
            </p>
          ) : (
            <p className="mt-4 text-sm text-emerald-400">
              Wallet connected: you can now choose how you want to use Solance.
            </p>
          )}

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <RoleCard
              title="Use Solance as a Client"
              description="Create contracts, receive proposals from contractors, choose one and lock funds in a vault."
              href="/client"
              disabled={!publicKey}
            />
            <RoleCard
              title="Use Solance as a Contractor"
              description="Register as a contractor, submit proposals on open contracts and claim payment when work is done."
              href="/contractor"
              disabled={!publicKey}
            />
          </div>
        </div>
      </section>

      {/* Simple footer */}
      <footer className="border-t border-zinc-800 py-4 text-center text-xs text-zinc-500">
        Built on Solana · Solance
      </footer>
    </main>
  );
}

function RoleCard({
  title,
  description,
  href,
  disabled,
}: {
  title: string;
  description: string;
  href: string;
  disabled?: boolean;
}) {
  const content = (
    <div className="h-full rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 text-left hover:border-zinc-500 transition-colors">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm text-zinc-400 mb-4">{description}</p>
      <span className="inline-flex items-center text-sm font-medium text-emerald-400">
        {disabled ? "Connect wallet first" : "Continue →"}
      </span>
    </div>
  );

  if (disabled) {
    return <div className="opacity-50 cursor-not-allowed">{content}</div>;
  }

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}
