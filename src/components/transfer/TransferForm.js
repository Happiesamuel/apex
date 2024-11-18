"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useState, useEffect } from "react";
import {
  createNotification,
  createTransactions,
  getUsers,
  updateUser,
} from "@/lib/action";
import { Toast } from "@/lib/utils";
import Popup from "../ui/Popup";
import TransferFormField from "./TransferFormField";
const formSchema = z.object({
  username: z.string().min(2),
  amount: z.string().min(2).max(10),
  pin: z.string().min(4).max(10),
  accountNumber: z.string().min(8).max(10),
});

export default function TransferForm({ setId, userAcc }) {
  const [value, setValue] = useState("");
  const [transferring, setTransfering] = useState(false);
  const [amountVal, setAmountVal] = useState("");
  const [user, setUser] = useState({});
  const [load, setLoad] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(
    function () {
      async function handleRecieverUsername() {
        try {
          setLoad(true);
          const users = await getUsers();
          const findUser = users.find((user) => user.accountNumber === value);
          if (!findUser) {
            setUser({});
            // alert("Account not found!");
            return Toast({
              title: "Account not found!",
              description:
                "The account number you have entered does not exist!",
            });
          }
          setUser(findUser);
          setLoad(false);
        } catch (err) {
          setLoad(false);
        } finally {
          setLoad(false);
        }
      }
      value.length < 10 && setUser({});
      value.length === 10 && handleRecieverUsername();
    },
    [value]
  );

  const form = useForm({
    resolver: zodResolver(formSchema),

    values: {
      username: user?.fullName ?? "",
      accountNumber: value,
    },
  });
  // console.log("sam");
  function handleShowModal() {
    if (!amountVal) return setIsOpen(false);
    setIsOpen(true);
  }
  async function onSubmit(values) {
    try {
      if (values.accountNumber === userAcc.accountNumber) {
        return Toast({
          title: "Failed to transfer",
          description: "Cannot transfer money to your own account",
        });
      }
      if (values.amount > userAcc.totalBalance || userAcc.totalBalance <= 15) {
        return Toast({
          title: "Insufficent fund!",
          description: "Your balance is too low to complete this transactions",
        });
      }
      if (+values.amount < 1)
        returnToast({
          title: "Invalid amount",
          description: `Please enter a correct amount`,
        });

      //  2410170648
      //  2410170620

      await Promise.all([
        // updateUser(userAcc["$id"], {
        //   totalBalance: userAcc.totalBalance - +values.amount,
        // }),
        // createTransactions({
        //   amount: +values.amount,
        //   credId: user["$id"],
        //   depId: userAcc["$id"],
        //   status: "deposit",
        //   depImg: userAcc.image,
        //   credName: user.fullName,
        //   depName: userAcc.fullName,
        // }),

        createNotification({
          title: "Withdrawal",
          message: `You sent $${+values.amount} to ${user.fullName}`,
          senderName: userAcc.fullName,
          image: user.image,
          status: false,
          senderId: userAcc["$id"],
          recieverId: user["$id"],
          recieverName: user.fullName,
        }),
      ]);
      await Promise.all([
        // updateUser(user["$id"], {
        //   totalBalance: user.totalBalance + +values.amount,
        // }),

        // createTransactions({
        //   amount: +values.amount,
        //   credId: user["$id"],
        //   depId: userAcc["$id"],
        //   status: "withdrawal",
        //   credImg: user.image,
        //   credName: user.fullName,
        //   depName: userAcc.fullName,
        // }),

        createNotification({
          title: "Deposit",
          message: `You recieved $${+values.amount} from ${userAcc.fullName}`,
          senderName: userAcc.fullName,
          image: userAcc.image,
          status: false,
          senderId: userAcc["$id"],
          recieverId: user["$id"],
          recieverName: user.fullName,
        }),
      ]);
      setUser({ ...user, totalBalance: user.totalBalance + +values.amount });
      setValue("");
      setAmountVal("");
      Toast({
        title: "Tranfer successfully",
        description: `You've sucessfully transfered $${values.amount} to ${user.fullName}`,
      });
    } catch (err) {
      setTransfering(false);
    } finally {
      setTransfering(false);
    }

    form.reset();
  }

  return (
    <Form {...form}>
      <form className=" flex flex-col gap-4 px-3 py-3 my-3 mr-3">
        <TransferFormField
          onchange={(val) => setValue(val)}
          name="accountNumber"
          disabled={false}
          type="number"
          form={form}
          placeholder="Enter Account number"
        />
        <TransferFormField
          name="username"
          disabled={true}
          type="text"
          form={form}
          placeholder={
            load ? "Getting reciever's username" : "Reciever username"
          }
        />

        {user?.fullName && (
          <TransferFormField
            onchange={(val) => setAmountVal(val)}
            name="amount"
            disabled={false}
            type="number"
            form={form}
            placeholder="Enter Amount"
          />
        )}

        <div className="flex gap-3">
          <Button
            onClick={() => handleShowModal()}
            type="reset"
            className="w-full bg-buttonOrange"
          >
            Submit
          </Button>
          <Button onClick={() => setId(null)} className="w-full bg-bgBlur">
            Cancel
          </Button>
        </div>

        {isOpen && (
          <Popup
            open={true}
            heading="Confirm pin"
            handleCancel={() => setIsOpen(false)}
            handleClick={form.handleSubmit(onSubmit)}
            type
            title={
              <TransferFormField
                name="pin"
                disabled={false}
                type="number"
                form={form}
                placeholder="Enter Pin"
              />
            }
          />
        )}
      </form>
    </Form>
  );
}
