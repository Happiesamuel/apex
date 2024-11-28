"use client";
import TransactionRow from "./TransactionRow";
import { Toast } from "@/lib/utils";
import PaginationDemo from "../PaginationDemo";
import { useSearchParams } from "next/navigation";
import { bills, RESULT_PER_PAGE } from "@/constants/constants";
import { FaSearch } from "react-icons/fa";
import { useDeleteTransaction } from "@/hooks/useDeleteTransaction";

function TransactionList({ val, transactionArr }) {
  const searchParams = useSearchParams();
  const { deleteTransaction, deleteStatus } = useDeleteTransaction();

  const page = +searchParams.get("page") || 1;
  const sortBy = searchParams.get("sortBy") || "all";
  function handleDelete(id) {
    deleteTransaction(id, {
      onSuccess: () => {
        Toast({
          title: "Deleted Transaction!",
          description: `You've sucessfully deleted this transaction from your transaction list.`,
        });
      },
      onError: () => {
        Toast({
          title: "Failed!",
          description: `Failed to delete this transaction`,
        });
      },
    });
  }
  const filtTrans = transactionArr.filter((x) =>
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
  return (
    <div className="">
      {!filtTrans.length ? (
        <div className="flex flex-col gap-2 items-center justify-center mb-3">
          <FaSearch className="text-3xl text-buttonOrange/50" />
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
              totalPage={Math.ceil(transactionArr.length / RESULT_PER_PAGE)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default TransactionList;
