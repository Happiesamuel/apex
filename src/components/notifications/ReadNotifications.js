"use client";

import { bills } from "@/constants/constants";
import { useRecieverNotification } from "@/hooks/useRecieverNotification";
import { useSenderNotification } from "@/hooks/useSenderNotification";
import { allNotifications } from "@/lib/utils";

import { useState, useOptimistic } from "react";
import SkeletonLoader from "./SkeletonLoader";
import OptimisticNotification from "./OptimisticNotification";

function ReadNotifications({ user, type }) {
  const { recieverNotifications, recieverStatus } = useRecieverNotification(
    user?.$id
  );
  const { senderStatus, senderNotifications } = useSenderNotification(
    user?.$id
  );
  const [checked, setChecked] = useState(false);

  if (recieverStatus === "pending" || senderStatus === "pending")
    return <SkeletonLoader />;
  const notificationsArr = [...recieverNotifications, ...senderNotifications];
  const arrNotifications = allNotifications(notificationsArr, user, type);
  const notifications = arrNotifications.map((arr) => {
    return {
      name: arr.senderName,
      img: arr.image,
      message: arr.message,
      date: arr.$createdAt,
      status: arr.status,
      title: arr.title,
      id: arr.$id,
    };
  });
  const arrBill = notifications.map((x) => x.name);
  const findArr = [
    ...new Set(arrBill.flatMap((x) => bills.filter((y) => y.title === x))),
  ];
  const arrSplit = [
    ...new Set(notifications.map((x) => x.date.slice(0, 10))),
  ].map((x) => {
    return {
      date: x,
      not: notifications.filter((notification) =>
        notification.date.startsWith(x)
      ),
    };
  });

  return (
    <OptimisticNotification
      setChecked={setChecked}
      arrSplit={arrSplit}
      type={type}
      checked={checked}
      findArr={findArr}
    />
  );
}

export default ReadNotifications;
