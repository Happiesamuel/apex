import TransactionChart from "@/components/transactions/TransactionChart";
import TransactionIncome from "@/components/transactions/TransactionIncome";
import { CiCalendar } from "react-icons/ci";

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

const page = async () => {
  const queryClient = new QueryClient();
  const session = await auth();
  const user = await getUsersByEmail(session?.user?.email);
  await queryClient.prefetchQuery({
    queryKey: ["debitTransactions"],
    queryFn: async () => await getDebitTransaction(user?.$id),
  });
  await queryClient.prefetchQuery({
    queryKey: ["creditTransactions"],
    queryFn: async () => await getCreditTransaction(user?.$id),
  });

  return (
    <div className=" text-zinc-100">
      <div className="flex items-center justify-between gap-2 mt-5 mb-4">
        <h1 className="text-zinc-300 text-4xl font-bold pl-2">Statistics</h1>
        <div className="flex gap-2 items-center">
          <p className="text-sm text-zinc-400">14 - 25 Aug 2020</p>
          <CiCalendar className="text-zinc-400 text-xl mr-3" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center pt-2 w-full">
        <TransactionChart />
        <TransactionIncome />
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
