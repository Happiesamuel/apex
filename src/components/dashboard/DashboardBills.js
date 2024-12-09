"use client";
import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Button } from "../ui/button";

import Link from "next/link";
import DashboardBillsDropdown from "./DashboardBillsDropdown";
import { Toast } from "@/lib/utils";
import { bills } from "@/constants/constants";
import { useBillsLocalStorage } from "@/hooks/useBillsLocalStorage";
import { FaTrashCan } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa";
import { format } from "date-fns";

export default function DashboardBills() {
  const [data, setData] = useBillsLocalStorage([], "bills");
  function handleDelete(e) {
    setData((i) => i.filter((a) => a !== e));
  }
  function handleClick(e) {
    const a = bills.find((bill) => bill.id === e);
    setData((i) => (i.some((x) => x.id === e) ? [...i] : [...i, a.id]));
    Toast({
      description: `You've scheduled ${a.title} payment for later.`,
      title: "Success",
    });
  }
  const date = new Date();
  const formattedDate = format(date, "MMM d, yyyy");
  const findData = data
    .flatMap((x) => bills.filter((y) => y.id === x))
    .map((x) => {
      return { ...x, date: formattedDate };
    });

  return (
    <div className="text-zinc-100 w-full md:w-[40%] lg:w-[40%] xl:w-[30%]  bg-bgBlur border border-zinc-800 rounded-3xl py-3 px-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-base text-zinc-300">Bill & Payment</h1>
        <DashboardBillsDropdown data={data} handleClick={handleClick}>
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
                      {bill.date}
                    </p>
                  </div>
                </Link>
                <FaTrashCan
                  onClick={() => handleDelete(bill.id)}
                  className="text-lg text-zinc-400"
                />
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
