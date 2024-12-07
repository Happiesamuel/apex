import React from "react";

import DashboardManagement from "@/components/dashboard/DashboardManagement";
import DashboardIncome from "@/components/dashboard/DashboardIncome";
import DashboardCashflow from "@/components/dashboard/DashboardCashflow";
import DashboardBills from "@/components/dashboard/DashboardBills";
import DashboardTransaction from "@/components/dashboard/DashboardTransaction";
import DashboardPieChart from "@/components/dashboard/DashboardPieChart";
import { auth } from "@/lib/auth";
import {
  getCreditTransaction,
  getDebitTransaction,
  getUsersByEmail,
} from "@/lib/action";
import DashboardPopup from "@/components/dashboard/DashboardPopup";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import apexImg from "@/../public/asset/apex-logo.png";
import Image from "next/image";
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
    <section className="text-zinc-100 h-full">
      <h1 className="text-xl mt-3 mb-2">Accounts</h1>
      {!user?.welcomePay && <DashboardPopup user={user} />}
      <DashboardManagement user={user} />
      <DashboardIncome user={user} />
      <div className="flex flex-col w-full justify-between items-start mt-7 md:flex-row gap-6">
        <DashboardCashflow user={user} />
        <DashboardBills />
      </div>
      <div className="flex flex-col gap-5 md:gap-2 justify-between items-center mt-5 pb-5 md:flex-row ">
        <DashboardPieChart user={user} />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <DashboardTransaction user={user} />
        </HydrationBoundary>
      </div>
    </section>
  );
};

export default page;
