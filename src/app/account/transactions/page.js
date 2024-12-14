import TransactionChart from "@/components/transactions/TransactionChart";
import TransactionIncome from "@/components/transactions/TransactionIncome";

import React from "react";
import Transactions from "@/components/transactions/Transactions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { auth } from "@/lib/auth";
import {
  getCreditTransaction,
  getDebitTransaction,
  getUsersByEmail,
} from "@/lib/action";
export async function generateMetadata() {
  return {
    title: `Transaction History`,
  };
}
const page = async () => {
  const queryClient = new QueryClient();
  const session = await auth();
  const user = await getUsersByEmail(session?.user?.email);
  await queryClient.prefetchQuery({
    queryKey: ["debitTransactions"],
    queryFn: async () => await getDebitTransaction(user),
  });
  await queryClient.prefetchQuery({
    queryKey: ["creditTransactions"],
    queryFn: async () => await getCreditTransaction(user),
  });

  return (
    <div className=" text-zinc-100">
      <div className="flex items-center justify-between gap-2 mt-5 mb-4">
        <h1 className="text-zinc-300 text-4xl font-bold pl-2">Statistics</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center pt-2 w-full">
        <TransactionChart user={user} />
        <TransactionIncome user={user} />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className=" pt-2 pb-20 md:mb-0">
          <Transactions user={user} />
        </div>
      </HydrationBoundary>
    </div>
  );
};

export default page;
