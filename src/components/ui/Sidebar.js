"use client";
import Image from "next/image";
import React from "react";
import { MdOutlineCheckBox } from "react-icons/md";
import apexImg from "@/../public/asset/apex-logo.png";
import userImg from "@/../public/asset/user-img.png";
import SidebarLinks from "../SidebarLinks";
import {
  sidebarLinks,
  sidebarLinksThree,
  sidebarLinksTwo,
} from "@/constants/constants";
import Link from "next/link";

const Sidebar = ({ user, userData }) => {
  return (
    <aside className=" h-full bank_sidebar mx-4 text-zinc-200">
      <div className="flex gap-3 items-center">
        <Image src={apexImg} alt="apex-logo" width={40} height={40} />
        <h1 className="lg:block hidden font-semibold text-xl">Apex</h1>
      </div>

      <Link
        href="/account/settings"
        className="flex justify-between items-center  gap-2  lg:border border-zinc-800 p-0 lg:p-2 mt-5 rounded-md"
      >
        <div className="flex gap-1">
          <div className="relative aspect-auto h-[40px] w-[40px]">
            <Image
              src={
                userData.image
                  ? userData.image
                  : user.image
                  ? user.image
                  : userImg
              }
              alt="user-logo"
              className="rounded-full object-cover object-center"
              fill
            />
          </div>
          <div className="lg:flex flex-col hidden justify-around">
            <div className="flex items-center gap-1">
              <h3 className="text-base">
                {userData.displayName ? userData.displayName : user.name}
              </h3>
              {userData?.countryFlag && (
                <Image
                  src={userData?.countryFlag}
                  width={20}
                  height={20}
                  alt={`flag of ${user.nationality}`}
                />
              )}
            </div>
            <p className="text-[10px] text-zinc-500">{user?.email}</p>
          </div>
        </div>
        <div>
          <MdOutlineCheckBox className="text-zinc-500 lg:block hidden font-semibold text-xl" />
        </div>
      </Link>

      <SidebarLinks data={sidebarLinks} type="MAIN" />
      <SidebarLinks data={sidebarLinksTwo} type="OTHERS" />
      <SidebarLinks data={sidebarLinksThree} type="LOGOUT" />
    </aside>
  );
};

export default Sidebar;
