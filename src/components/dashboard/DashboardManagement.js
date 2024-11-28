import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { PiDotsThreeCircleThin } from "react-icons/pi";
import { FaPlus, FaWallet } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
export default function DashboardManagement({ user }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-3">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 text-zinc-200 border border-zinc-700 rounded-full px-2 py-1">
          <FaWallet className="bg-walletColor  rounded-lg p-1 text-xl" />
          <div> &#x2022;&#x2022;&#x2022;&#x2022;</div>
          <p>{user?.accountNumber?.toString().slice(6, 10)}</p>
        </div>

        <div className="flex  gap-2 text-3xl text-zinc-500">
          <CiCirclePlus />
          <div className="h-[30px] w-[1px] bg-zinc-700" />
          <PiDotsThreeCircleThin />
        </div>
      </div>

      <div className="flex gap-2 w-full items-center justify-between md:justify-end">
        <Button className="flex items-center gap-2 bg-bgBlur text-zinc-400 border border-zinc-700 rounded-full">
          <IoSettingsOutline />
          <p className="text-base">Manage Balance</p>
        </Button>
        <Button className=" bg-buttonOrange text-zinc-100  rounded-full">
          <Link href="/account/transfer" className="flex items-center gap-2">
            <FaPlus />
            <p className="text-base">New Payment</p>
          </Link>
        </Button>
      </div>
    </div>
  );
}
