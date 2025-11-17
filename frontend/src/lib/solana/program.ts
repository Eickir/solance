"use client";

import { useMemo } from "react";
import {
  AnchorProvider,
  Idl,
  Program,
  setProvider,
} from "@coral-xyz/anchor";
import {
  useConnection,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

import idl from "./solance_idl.json";

export const SOLANCE_PROGRAM_ID = new PublicKey(
  (idl as any).address ?? "4JasCNGt4XMT7hGh86296TQXrvyJYXEhF6R4apdVLyXg"
);

export function useSolanceProgram() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const program = useMemo(() => {
    if (!connection) return null;

    const provider = new AnchorProvider(connection, wallet ?? ({} as any), {
      preflightCommitment: "confirmed",
    });

    setProvider(provider);

    return new Program(idl as Idl, {
      connection,
    });
  }, [connection, wallet]);

  return program;
}
