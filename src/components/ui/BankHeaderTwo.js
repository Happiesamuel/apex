import { MdKeyboardArrowRight } from "react-icons/md";
import { HeaderInput } from "../HeaderInput";
import { Button } from "./button";
import { addHours, addMinutes, intervalToDuration } from "date-fns";
import { claimDate, subtractDays, Toast } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useCreateNotification } from "@/hooks/useCreateNotification";
import apexLogo from "@/../public/asset/apex-logo.png";

function BankHeaderTwo({ children, active, user }) {
  const { updateUser, status } = useUpdateUser();
  const { createNotification } = useCreateNotification();
  const [time, setTime] = useState(
    user?.claimDate || "2023-12-14T12:50:26.989+01:00"
  );
  const [currentDate, setCurrentDate] = useState(new Date());
  const [remainingTime, setRemainingTime] = useState("");
  const now = new Date();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate((prevDate) => {
        const newDate = new Date(prevDate.getTime() + 1000);
        return newDate;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const targetDate = new Date(time);
    const interval = setInterval(() => {
      const currentTime = new Date();
      const diff = targetDate - currentTime;
      if (diff <= 0) {
        clearInterval(interval);
        setRemainingTime("00h:00:m:00s");
        return;
      }
      const duration = intervalToDuration({
        start: currentTime,
        end: targetDate,
      });
      setRemainingTime(
        `${String(duration?.hours || 0).padStart(2, "0")}h:${String(
          duration?.minutes || 0
        ).padStart(2, "0")}m:${String(duration?.seconds || 0).padStart(
          2,
          "0"
        )}s`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  function handleClaim() {
    const date = claimDate(addHours(now, 24));
    updateUser(
      {
        id: user.$id,
        obj: {
          totalBalance: user.totalBalance + 100,
          claimDate: date,
        },
      },
      {
        onError: () =>
          Toast({
            description: `failed to claim daily $100`,
            title: "Claim failed.",
          }),
        onSuccess: () => {
          Toast({
            title: "Credited!",
            description: `You've claimed your daily $100.`,
          });
        },
      }
    );
    createNotification(
      {
        title: "Claim Daily Reward.",
        message: `You've claimed your daily $100. Next claim will be same time tomorrow.`,
        senderName: "Apex",
        image: apexLogo.src,
        status: false,
        senderId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
        recieverId: user.$id,
        recieverName: user.fullName,
      },
      {
        onError: () =>
          Toast({
            description: `failed to created notification`,
            title: "Failed!",
          }),
        onSuccess: () => {
          Toast({
            title: "Notification",
            description: `1 new notification!`,
          });
        },
      }
    ),
      setTime(date);
  }
  const a = claimDate(currentDate);
  const b = subtractDays(a, time);
  return (
    <header className="bank_header text-zinc-500 ">
      <div className="flex gap-2 items-center">
        <div className="text-xl">{active?.svg}</div>
        <div className="text-xl hidden md:block">
          {" "}
          <MdKeyboardArrowRight />
        </div>
        <div className="text-base hidden md:block">{active?.title}</div>
      </div>

      <div className="flex gap-3 items-center">
        {children}
        <Button
          disabled={b < 0 || status === "pending"}
          onClick={() => handleClaim()}
          className="bg-buttonOrange disabled:!cursor-not-allowed text-zinc-100 rounded-full"
        >
          {b < 0 && remainingTime !== "00h:00:m:00s"
            ? `Next claim in ${remainingTime}`
            : "Claim daily bonus"}
        </Button>
      </div>
    </header>
  );
}

export default BankHeaderTwo;
