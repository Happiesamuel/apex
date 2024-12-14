"use client";
import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Button } from "../ui/button";
import Link from "next/link";
import DashboardBillsDropdown from "./DashboardBillsDropdown";
import { Toast } from "@/lib/utils";
import { bills } from "@/constants/constants";
import { FaTrashCan } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa";
import { format, parseISO } from "date-fns";
import { useGetBills } from "@/hooks/useGetBills";
import { useDeleteBill } from "@/hooks/useDeleteBill";
import { ClipLoader, MoonLoader } from "react-spinners";

export default function DashboardBills({ user }) {
  const { billsData, status } = useGetBills(user);
  const { deleteBill, deleteStatus } = useDeleteBill();
  const [deleteId, setDeleteId] = useState(null);
  if (status === "pending")
    return (
      <div className="flex flex-col items-center justify-center text-center h-[340px] w-full md:w-[40%] lg:w-[40%] xl:w-[30%]  bg-bgBlur border border-zinc-800 rounded-3xl py-3 px-4">
        <MoonLoader speedMultiplier={0.5} color="#ea763d" size={30} />
        <p className="text-zinc-400 text-sm mt-3">Loading Bills...</p>
      </div>
    );
  const findData = billsData?.length
    ? billsData.flatMap((x) => {
        {
          return bills
            .filter((y) => y.id === x.billId)
            .map((q) => {
              return {
                ...q,
                id: x.$id,
                date: x.$createdAt,
              };
            });
        }
      })
    : [];
  function handleDelete(id) {
    setDeleteId(id);
    deleteBill(id, {
      onSuccess: () => {
        Toast({
          description: `Deleted`,
          title: "Success",
        });
      },
      onError: () => {
        Toast({
          description: `Failed to delete`,
          title: "Failed",
        });
      },
    });
  }
  return (
    <div className="text-zinc-100 w-full md:w-[40%] lg:w-[40%] xl:w-[30%]  bg-bgBlur border border-zinc-800 rounded-3xl py-3 px-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-base text-zinc-300">Bill & Payment</h1>
        <DashboardBillsDropdown user={user}>
          <CiCirclePlus className="text-2xl cursor-pointer" />
        </DashboardBillsDropdown>
      </div>

      {!findData.length ? (
        <div className="flex flex-col items-center justify-center text-center h-[250px]  gap-2">
          <div className="rounded-full bg-buttonOrange p-3 text-zinc-300">
            <FaMoneyBill className="text-2xl" />
          </div>
          <p className="text-sm text-zinc-400">
            You haven&apos;t scheduled any bills to pay yet
          </p>
        </div>
      ) : (
        <div className="mt-6 mb-3 gap-4 flex flex-col h-[220px] overflow-scroll no-scrollbar">
          {findData.map((bill) => (
            <div
              key={bill.id}
              className="flex flex-col cursor-pointer border border-zinc-800 bg-[#181818] rounded-xl "
            >
              <div className="flex justify-between items-center  py-2 px-2">
                <Link
                  href={`/account/payments/${bill.title
                    .toLowerCase()
                    .split(" ")
                    .join("_")}`}
                  className="flex gap-2 items-center"
                >
                  <div className={`bg-[${bill.svgColDark}] p-3 rounded-lg`}>
                    {bill.svg}
                  </div>
                  <div>
                    <h4 className="text-base text-zinc-300">{bill.title}</h4>
                    <p className="text-sm font-[500] text-zinc-600 mt-1">
                      {format(parseISO(bill.date), "MMM d, yyyy")}
                    </p>
                  </div>
                </Link>
                {deleteStatus !== "pending" || deleteId !== bill.id ? (
                  <FaTrashCan
                    onClick={() => handleDelete(bill.id)}
                    className="text-lg text-zinc-400"
                  />
                ) : (
                  <ClipLoader color="#ea763d" size={20} />
                )}
              </div>
              <div className="flex justify-between items-center bg-[#212121]  px-2 py-1 rounded-b-xl">
                <p className="text-xs text-zinc-300"></p>
                <div className="border-2 border-[#403323]  bg-[#272521] px-3 py-1 rounded-full  text-zinc-400 text-[10px]">
                  Scheduled
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link href="/account/payments">
        <Button className="w-full bg-zinc-800 rounded-full py-1 text-zinc-400">
          View All
        </Button>
      </Link>
    </div>
  );
}
