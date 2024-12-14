"use client";
import { sidebarLinks, sidebarLinksTwo } from "@/constants/constants";
import { usePathname } from "next/navigation";
import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Button } from "./button";
import { HeaderInput } from "../HeaderInput";
import Link from "next/link";
import { useSenderNotification } from "@/hooks/useSenderNotification";
import { useRecieverNotification } from "@/hooks/useRecieverNotification";
import { allNotifications } from "@/lib/utils";
import SkeletonLoader from "../notifications/SkeletonLoader";
import BankHeaderTwo from "./BankHeaderTwo";
import { ClipLoader } from "react-spinners";

export default function BankHeader({ user }) {
  const pathname = usePathname();
  const { recieverNotifications, recieverStatus } = useRecieverNotification(
    user?.$id
  );
  const { senderStatus, senderNotifications } = useSenderNotification(
    user?.$id
  );
  const slug = pathname.split("/").at(pathname.split("/").length === 2 ? 1 : 2);
  const links = [...sidebarLinks, ...sidebarLinksTwo];
  const active = links.find((x) => x.slug === slug);

  if (recieverStatus === "pending" || senderStatus === "pending")
    return (
      <BankHeaderTwo user={user} active={active}>
        <ClipLoader color="#ea763d" size={20} />
      </BankHeaderTwo>
    );
  const arrNotifications = allNotifications(
    [...recieverNotifications, ...senderNotifications],
    user,
    "unread"
  );
  const notify = arrNotifications.map((arr) => {
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

  return (
    <BankHeaderTwo user={user} active={active}>
      <Link href="/account/notifications" className="relative">
        <IoMdNotificationsOutline className="text-xl" />
        {notify.some((x) => !x.status) && (
          <div className="w-1 h-1 bg-buttonOrange rounded-full absolute bottom-[76%] left-[53%]" />
        )}
      </Link>
    </BankHeaderTwo>
  );
}
