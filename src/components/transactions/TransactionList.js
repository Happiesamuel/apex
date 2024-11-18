"use client";
import { useEffect, useOptimistic } from "react";
import TransactionRow from "./TransactionRow";
import { deleteTransaction } from "@/lib/action";
import { allTransactions, Toast } from "@/lib/utils";
import PaginationDemo from "../PaginationDemo";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { bills, RESULT_PER_PAGE } from "@/constants/constants";
import { FaSearch } from "react-icons/fa";

function TransactionList({ val, transactionArr }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [optimisticTransaction, optimisticDelete] = useOptimistic(
    transactionArr,
    (currTrans, id) => currTrans.filter((trans) => trans.transId !== id)
  );
  const page = +searchParams.get("page") || 1;
  const sortBy = searchParams.get("sortBy") || "all";
  useEffect(
    function () {
      function handleClick() {
        const params = new URLSearchParams(searchParams);
        params.set("page", 1);
        router.replace(`${pathname}?${params.toString()}`);
      }
      handleClick();
    },
    [pathname, router, searchParams]
  );

  async function handleDelete(id) {
    optimisticDelete(id);
    await deleteTransaction(id);
    Toast({
      title: "Deleted Transaction!",
      description: `You've sucessfully deleted transaction from your transaction list.`,
    });
  }
  const trans = optimisticTransaction;
  const filtTrans = trans.filter((x) =>
    x.name.toLowerCase().startsWith(val.toLowerCase())
  );
  let sortArr;
  if (sortBy === "all") sortArr = filtTrans;
  if (sortBy === "deposit") {
    sortArr = filtTrans.sort((a, b) => {
      if (a.status === "deposit" && b.status !== "deposit") return -1;

      if (a.status !== "deposit" && b.status === "deposit") return 1;

      return 0;
    });
  }
  if (sortBy === "withdrawal") {
    sortArr = filtTrans.sort((a, b) => {
      if (a.status === "withdrawal" && b.status !== "withdrawal") return -1;

      if (a.status !== "withdrawal" && b.status === "withdrawal") return 1;

      return 0;
    });
  }
  const findArr = transactionArr.map((x) => x.name);
  const findArr2 = [
    ...new Set(findArr.flatMap((x) => bills.filter((y) => y.title === x))),
  ];
  const arr = sortArr.slice(
    (page - 1) * RESULT_PER_PAGE,
    page * RESULT_PER_PAGE
  );
  console.log(arr);
  return (
    <div className="">
      {!optimisticTransaction.length ? (
        <div className="flex flex-col items-center justify-center">
          <p>
            You&apos;ve haven&apos;t transfered or recieve any transactions.
          </p>
        </div>
      ) : !filtTrans.length ? (
        <div className="flex flex-col gap-2 items-center justify-center mb-3">
          <FaSearch className="text-3xl text-zinc-500" />
          <p className="text-zinc-400 text-base font-semibold">
            No result for &quot;{val}&quot;
          </p>
        </div>
      ) : (
        <>
          <ul className="mt-3 flex-col flex gap-3 mb-4">
            {arr.map((transaction) => (
              <TransactionRow
                findArr2={findArr2}
                key={transaction.id}
                transaction={transaction}
                deleteTransaction={handleDelete}
              />
            ))}
          </ul>
          {filtTrans.length > RESULT_PER_PAGE && (
            <PaginationDemo
              totalPage={Math.ceil(
                optimisticTransaction.length / RESULT_PER_PAGE
              )}
            />
          )}
        </>
      )}
    </div>
  );
}

export default TransactionList;
