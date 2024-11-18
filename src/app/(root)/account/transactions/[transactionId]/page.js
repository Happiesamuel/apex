import React from "react";
import userImg from "../../../../public/asset/user-img.png";
import Image from "next/image";
import { getTransaction, getTransactions, getUsersByEmail } from "@/lib/action";
import { auth } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { bills } from "@/constants/constants";
export async function generateStaticParams() {
  const transactions = await getTransactions();
  return transactions.map((transaction) => ({
    id: transaction["$id"],
  }));
}
const page = async ({ params }) => {
  const transactionId = params.transactionId;
  const session = await auth();
  const existingUser = await getUsersByEmail(session.user.email);
  const transactions = await getTransaction(transactionId);
  const transaction = transactions
    .map((transaction) => {
      return {
        id: transaction["$id"],
        name:
          transaction.credName === existingUser.fullName
            ? transaction.depName
            : transaction.credName,
        amount: transaction.amount,
        status: transaction.status,
        date: transaction["$createdAt"],
        img:
          transaction.credImg === null
            ? transaction.depImg
            : transaction.credImg,
      };
    })
    .at(0);
  // const findArr = transaction.map((x) => x.name);
  const findArr = bills.find((x) => x.title === transaction.name);
  console.log(findArr);
  return (
    <div className="text-zinc-100 flex flex-col items-center justify-center w-full h-[75vh]">
      <div className="flex flex-col gap-4 items-center mb-16">
        <div className="text-6xl">🎉</div>
        <p className="text-center text-zinc-400 text-base">
          Yaay! We will let know the recipient that{" "}
          {transaction.status === "withdrawal"
            ? "you've sent money"
            : "have sent you money"}
        </p>
      </div>
      <div className="bg-bgBlur border border-zinc-800  min-w-[80%] rounded-xl px-3 py-3">
        <div className="items-center  flex flex-col mb-3 ">
          {findArr ? (
            <div className="relative mb-8">
              <div
                className={`bg-[${findArr.svgColDark}] border-2 border-buttonOrange left-[-35px] top-[-40px] absolute p-3 rounded-full text-4xl`}
              >
                {findArr.svg}
              </div>
            </div>
          ) : (
            <div className="relative aspect-square w-[60px]  ">
              <Image
                src={transaction.img ? transaction.img : userImg}
                alt="apex-logo"
                width={60}
                height={60}
                className={`${
                  transaction.name === "Apex"
                    ? " bg-buttonOrange p-2 "
                    : transaction.img
                    ? "border-2 border-buttonOrange"
                    : " bg-buttonOrange"
                } absolute  top-[-35px] rounded-full  `}
              />
            </div>
          )}

          <h4 className="text-zinc-400 text-sm">
            {transaction.status === "deposit" ? "From" : "To"}{" "}
            {transaction.name}
          </h4>
          <p className="text-zinc-300 text-xl">${transaction.amount}.00</p>
        </div>
        <div className="grid grid-cols-[1fr_0.3fr] justify-between    text-zinc-400 text-lg">
          <div className="flex flex-col gap-3 divide-y-4 divide-dotted divide-zinc-800">
            <p>Transaction Id</p>
            <p>Status</p>
            <p>Amount</p>
            <p>Date</p>
          </div>

          <div className="text-zinc-300 flex flex-col gap-3 font-[500] divide-y-4 divide-dotted divide-zinc-800">
            <p>{transactionId}</p>
            <p>{transaction.status}</p>
            <p>${transaction.amount}</p>
            <p>{formatDate(transaction.date)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
