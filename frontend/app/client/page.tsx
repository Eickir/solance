"use client";

import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSolanceProgram, SOLANCE_PROGRAM_ID } from "@/lib/solana/program";
import { useInitializeClient } from "@/hooks/useInitializeClient";

const CLIENT_SEED = "client";

export default function ClientPage() {
  const { publicKey } = useWallet();
  const program = useSolanceProgram();

  const {
    initializeClient,
    loading: initLoading,
    error: initError,
    clientPda: createdClientPda,
  } = useInitializeClient();

  const [clientPda, setClientPda] = useState<PublicKey | null>(null);
  const [exists, setExists] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);

  // Detect existing Client account
  useEffect(() => {
    if (!program || !publicKey) return;

    const [pda] = PublicKey.findProgramAddressSync(
      [Buffer.from(CLIENT_SEED), publicKey.toBuffer()],
      SOLANCE_PROGRAM_ID
    );
    setClientPda(pda);

    (async () => {
      setChecking(true);
      try {
        await (program as any).account.client.fetch(pda);
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
        <p>Please connect your wallet to access the client dashboard.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Client setup</h1>
          <p className="text-zinc-400 text-sm">
            As a client, you can create on-chain contracts, receive proposals, choose a contractor
            and lock funds into a vault.
          </p>
        </header>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
          <h2 className="text-lg font-semibold">On-chain Client account</h2>

          <p className="text-sm text-zinc-400">
            This account is a PDA derived from your wallet and stores your next contract id.
          </p>

          <div className="text-sm space-y-1">
            <div>
              <span className="text-zinc-500">Wallet: </span>
              <span className="font-mono text-xs">
                {publicKey.toBase58()}
              </span>
            </div>

            {clientPda && (
              <div>
                <span className="text-zinc-500">Client PDA: </span>
                <span className="font-mono text-xs">
                  {clientPda.toBase58()}
                </span>
              </div>
            )}
          </div>

          <div className="mt-4">
            {checking ? (
              <p className="text-sm text-zinc-400">Checking client account on-chain…</p>
            ) : exists ? (
              <div className="space-y-2">
                <p className="text-sm text-emerald-400">
                  ✅ Client account already initialized on-chain.
                </p>
                <p className="text-xs text-zinc-400">
                  You can now create missions/contracts from the contracts page.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-amber-400">
                  No client account found for this wallet.
                </p>
                <button
                  onClick={() => initializeClient()}
                  disabled={initLoading}
                  className="inline-flex items-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400 disabled:opacity-60"
                >
                  {initLoading ? "Initializing on-chain..." : "Initialize Client account"}
                </button>
                {initError && (
                  <p className="text-xs text-red-400 mt-1">Error: {initError}</p>
                )}
                {createdClientPda && (
                  <p className="text-xs text-emerald-400">
                    New client PDA: {createdClientPda.toBase58()}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 text-sm text-zinc-400 space-y-2">
          <p>
            Once your client account is initialized, you can go to the{" "}
            <span className="font-mono text-xs">/contracts/new</span> page to create your first
            mission on-chain.
          </p>
        </section>
      </div>
    </main>
  );
}
