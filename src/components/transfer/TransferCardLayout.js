import Image from "next/image";
import React from "react";
import Payment from "@/../public/asset/payment-img.png";
import TransferCard from "./TransferCard";
export default function TransferCardLayout({ user }) {
  return (
    <div className="pl-1 hidden md:block">
      <div className="relative w-full aspect-square h-[150px]">
        <Image
          src={Payment}
          alt="payment logo"
          quality={80}
          placeholder="blur"
          fill
          className="object-cover"
        />
        <div className="absolute z-10 text-4xl border-8 border-backgroundColor font-bold -bottom-[35%] left-[3%] bg-bgBlur rounded-full px-5 py-3">
          <h1 className="font-inter">
            {user.displayName
              ? user?.displayName.toUpperCase().at(0)
              : user?.fullName.toUpperCase().at(0)}
          </h1>
        </div>
      </div>
      <div className=" pl-[6.2rem] border-b border-zinc-800 bg-bgBlur py-4">
        <p className="text-zinc-300 text-base font-[600]">
          {user.displayName ? user.displayName : user.fullName}
        </p>
        <p className="text-zinc-500 text-xs">{user?.email}</p>
      </div>

      <TransferCard user={user} />
    </div>
  );
}
