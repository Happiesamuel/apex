import React from "react";
import TransactionBills from "./TransactionBills";

export default function Transactions({ user }) {
  return (
    <div className="text-zinc-100 mt-5 w-full bg-bgBlur border border-zinc-800 rounded-3xl py-3 px-4 h-full">
      <TransactionBills user={user} />
    </div>
  );
}
