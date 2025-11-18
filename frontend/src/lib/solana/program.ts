"use client";

import { useMemo } from "react";
import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

import idl from "./solance_idl.json";

export const SOLANCE_PROGRAM_ID = new PublicKey(
  // soit idl.address, soit metadata.address selon ton IDL
  (idl as any).address ?? "9os8f9dUNrZzg53kjGb1wj1stMabFFj4fuRnrF9pCjR6"
);

export function useSolanceProgram() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const program = useMemo(() => {
    if (!connection || !wallet) return null;

    const provider = new AnchorProvider(connection, wallet, {
      preflightCommitment: "confirmed",
    });

    // ✅ signature correcte
    return new Program(idl as Idl, provider);
  }, [connection, wallet]);

  return program;
}
