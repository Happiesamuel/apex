import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Button } from "../ui/button";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiNetflixFill } from "react-icons/ri";
import { FaSpotify } from "react-icons/fa";
import Link from "next/link";

export default function DashboardBills() {
  return (
    <div className="text-zinc-100 w-full md:w-[30%] bg-bgBlur border border-zinc-800 rounded-3xl py-3 px-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-base text-zinc-300">Bill & Payment</h1>
        <Link href="/payments">
          <CiCirclePlus className="text-2xl cursor-pointer" />
        </Link>
      </div>

      <div className="mt-6 mb-3 gap-4 flex flex-col">
        <Link
          href="/payments/netflix"
          className="flex flex-col cursor-pointer border border-zinc-800 bg-[#181818] rounded-xl "
        >
          <div className="flex justify-between items-center  py-2 px-2">
            <div className="flex gap-2 items-center">
              <div className="bg-[#3b1f1d] p-3 rounded-lg">
                <RiNetflixFill className="text-[#ff4738] text-xl" />
              </div>
              <div>
                <h4 className="text-base text-zinc-300">
                  Netflix Subscription
                </h4>
                <p className="text-sm font-[500] text-zinc-600 mt-1">
                  Aug 15,2024
                </p>
              </div>
            </div>
            <MdKeyboardArrowRight className="text-2xl text-zinc-400" />
          </div>
          <div className="flex justify-between items-center bg-[#212121]  px-2 py-1 rounded-b-xl">
            <p className="text-xs text-zinc-300">$25.30</p>
            <div className="border-2 border-[#403323]  bg-[#272521] px-3 py-1 rounded-full  text-zinc-400 text-[10px]">
              Scheduled
            </div>
          </div>
        </Link>

        <Link
          href="/payments/spotify"
          className="flex flex-col cursor-pointer border border-zinc-800 bg-[#181818] rounded-xl "
        >
          <div className="flex justify-between items-center  py-2 px-2">
            <div className="flex gap-2 items-center">
              <div className="bg-[#173420] p-3 rounded-lg">
                <FaSpotify className="text-[#11c64a] text-xl" />
              </div>
              <div>
                <h4 className="text-base text-zinc-300">
                  Spotify Subscription
                </h4>
                <p className="text-sm font-[500] text-zinc-600 mt-1">
                  Aug 15,2024
                </p>
              </div>
            </div>
            <MdKeyboardArrowRight className="text-2xl text-zinc-400" />
          </div>
          <div className="flex justify-between items-center bg-[#212121]  px-2 py-1 rounded-b-xl">
            <p className="text-xs text-zinc-300">$25.30</p>
            <div className="border-2 border-[#403323]  bg-[#272521] px-3 py-1 rounded-full  text-zinc-400 text-[10px]">
              Scheduled
            </div>
          </div>
        </Link>
      </div>

      <Link href="/payments">
        <Button className="w-full bg-zinc-800 rounded-full py-1 text-zinc-400">
          View All
        </Button>
      </Link>
    </div>
  );
}
