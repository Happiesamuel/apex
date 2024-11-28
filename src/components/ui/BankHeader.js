"use client";
import { sidebarLinks, sidebarLinksTwo } from "@/constants/constants";
import { usePathname } from "next/navigation";
import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Button } from "./button";
import { HeaderInput } from "../HeaderInput";

export default function BankHeader({ notifications }) {
  const pathname = usePathname();
  const slug = pathname.split("/").at(pathname.split("/").length === 2 ? 1 : 2);
  const links = [...sidebarLinks, ...sidebarLinksTwo];
  const active = links.find((x) => x.slug === slug);
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
        <HeaderInput />
        <div className="relative">
          <IoMdNotificationsOutline className="text-xl" />
          {notifications.some((x) => !x.status) && (
            <div className="w-1 h-1 bg-buttonOrange rounded-full absolute bottom-[76%] left-[53%]" />
          )}
        </div>
        <Button className="bg-buttonOrange text-zinc-100 rounded-full">
          Earn $90
        </Button>
      </div>
    </header>
  );
}
