"use client";

import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSolanceProgram, SOLANCE_PROGRAM_ID } from "@/lib/solana/program";
import { useInitializeContractor } from "@/hooks/useInitializeContractor";

const CONTRACTOR_SEED = "contractor";

export default function ContractorPage() {
  const { publicKey } = useWallet();
  const program = useSolanceProgram();

  const {
    initializeContractor,
    loading: initLoading,
    error: initError,
    contractorPda: createdContractorPda,
  } = useInitializeContractor();

  const [contractorPda, setContractorPda] = useState<PublicKey | null>(null);
  const [exists, setExists] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!program || !publicKey) return;

    const [pda] = PublicKey.findProgramAddressSync(
      [Buffer.from(CONTRACTOR_SEED), publicKey.toBuffer()],
      SOLANCE_PROGRAM_ID
    );
    setContractorPda(pda);

    (async () => {
      setChecking(true);
      try {
        await (program as any).account.contractor.fetch(pda);
        setExists(true);
      } catch {
        setExists(false);
      } finally {
        setChecking(false);
      }
    })();
  }, [program, publicKey]);

  if (!publicKey) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center">
        <p>Please connect your wallet to access the contractor dashboard.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Contractor setup</h1>
          <p className="text-zinc-400 text-sm">
            As a contractor, you can create proposals on open contracts and claim payment once your
            work is validated.
          </p>
        </header>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
          <h2 className="text-lg font-semibold">On-chain Contractor account</h2>

          <p className="text-sm text-zinc-400">
            This account is a PDA derived from your wallet and tracks your next proposal id.
          </p>

          <div className="text-sm space-y-1">
            <div>
              <span className="text-zinc-500">Wallet: </span>
              <span className="font-mono text-xs">
                {publicKey.toBase58()}
              </span>
            </div>

            {contractorPda && (
              <div>
                <span className="text-zinc-500">Contractor PDA: </span>
                <span className="font-mono text-xs">
                  {contractorPda.toBase58()}
                </span>
              </div>
            )}
          </div>

          <div className="mt-4">
            {checking ? (
              <p className="text-sm text-zinc-400">Checking contractor account on-chain…</p>
            ) : exists ? (
              <div className="space-y-2">
                <p className="text-sm text-emerald-400">
                  ✅ Contractor account already initialized on-chain.
                </p>
                <p className="text-xs text-zinc-400">
                  You can now browse open contracts and submit proposals.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-amber-400">
                  No contractor account found for this wallet.
                </p>
                <button
                  onClick={() => initializeContractor()}
                  disabled={initLoading}
                  className="inline-flex items-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400 disabled:opacity-60"
                >
                  {initLoading
                    ? "Initializing on-chain..."
                    : "Initialize Contractor account"}
                </button>
                {initError && (
                  <p className="text-xs text-red-400 mt-1">Error: {initError}</p>
                )}
                {createdContractorPda && (
                  <p className="text-xs text-emerald-400">
                    New contractor PDA: {createdContractorPda.toBase58()}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 text-sm text-zinc-400 space-y-2">
          <p>
            Once your contractor account is initialized, you’ll be able to create proposals for
            specific contracts from the proposals page.
          </p>
        </section>
      </div>
    </main>
  );
}
