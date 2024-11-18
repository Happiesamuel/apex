"use client";
import React, { useState } from "react";
import Counter from "../Countup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
export default function TransferBalance({ user }) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-2 mt-6">
      <p className="text-zinc-500 text-sm font-[200]">YOUR BALANCE</p>
      <div className="flex items-center gap-3">
        {!show ? (
          <Counter size="text-3xl" amount={user?.totalBalance} />
        ) : (
          <p className="text-4xl">****</p>
        )}
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
      </div>
    </div>
  );
}
