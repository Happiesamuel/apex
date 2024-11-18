import React from "react";
import Payment from "@/../public/asset/atm.png";
import apexLogo from "@/../public/asset/apex-logo.png";
import Image from "next/image";
import { FcSimCardChip } from "react-icons/fc";

export default function TransferCard({ user }) {
  return (
    <div className="mt-10 w-[350px]">
      <div className="relative w-full aspect-square h-[180px] ">
        <Image
          src={Payment}
          alt="payment logo"
          quality={80}
          placeholder="blur"
          fill
          className="object-cover rounded-lg"
        />
        <div className="absolute z-10 w-full flex flex-col justify-between h-full p-2 ">
          <div className="flex justify-between items-center">
            <p className="font-bold uppercase text-sm">Credit card</p>
            <Image
              src={apexLogo}
              width={20}
              height={20}
              alt="apex logo"
              placeholder="blur"
            />
          </div>
          <div className="flex flex-col ">
            <FcSimCardChip className="text-4xl" />
            <p>
              ●●●● ●●●●{" "}
              <span className="text-16">
                {user?.accountNumber.toString().slice(6, 10)}
              </span>
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-[500]">{user.fullName}</p>
            <Image
              src="/asset/mastercard.svg"
              width={45}
              height={32}
              alt="mastercard"
              className="ml-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
