import TransferPaymentLayout from "@/components/transfer/TransferPaymentLayout";
import {
  getCreditTransaction,
  getDebitTransaction,
  getUsersByEmail,
} from "@/lib/action";
import { auth } from "@/lib/auth";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransferPaymentLayout user={user} />
    </HydrationBoundary>
  );
};

export default page;
