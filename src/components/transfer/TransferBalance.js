"use client";
import React, { useState } from "react";
import Counter from "../Countup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { Toast } from "@/lib/utils";
export default function TransferBalance({ user, type }) {
  const [show, setShow] = useState(false);
  const handleCopy = () => {
    navigator.clipboard
      .writeText(user?.accountNumber)
      .then(() => {
        Toast({
          description: `You copied your account number to your clipboard.`,
          title: "Account Number Copied!",
        });
      })
      .catch((err) => {
        Toast({
          description: `Failed to copy your account number.`,
          title: "Failed",
        });
      });
  };
  return (
    <div className="flex justify-between items-start mt-6 pr-2">
      <div className={`${type === "payment" && "lg:hidden"}`}>
        <p className="text-zinc-500 text-sm font-[200]">YOUR ACCOUNT NUMBER</p>
        <div className="flex items-center gap-1">
          <h1 className={`text-2xl text-zinc-200 font-[100] text-start`}>
            {user?.accountNumber}
          </h1>
          <div className="border border-zinc-700 p-1 rounded-sm">
            <IoCopy
              onClick={() => handleCopy()}
              className="text-xs text-zinc-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-zinc-500 text-sm font-[200] text-end">
          YOUR BALANCE
        </p>
        <div className="flex items-center gap-3">
          {!show ? (
            <FaRegEyeSlash
              onClick={() => setShow(true)}
              className="cursor-pointer text-xl text-zinc-500"
            />
          ) : (
            <FaRegEye
              onClick={() => setShow(false)}
              className="cursor-pointer text-xl text-zinc-500"
            />
          )}
          {!show ? (
            <Counter size="text-2xl" amount={user?.totalBalance} />
          ) : (
            <p className="text-2xl text-end">****</p>
          )}
        </div>
      </div>
    </div>
  );
}
