"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SignOutModal } from "./authlayout/SignOutModal";
import SidebarShow from "./ui/SidebarShow";
import { useSignout } from "@/hooks/useSignout";

export default function SidebarLinks({ data, type }) {
  const pathname = usePathname();
  const { status } = useSignout();
  const slug = pathname.split("/").at(pathname.split("/").length === 2 ? 1 : 2);
  return (
    <div className="mt-6 ">
      <p className="text-xs text-zinc-500 font-[500] mb-2">{type}</p>
      <ul className="flex flex-col gap-1">
        {data.map((link) => (
          <Link href={link.route} key={link.title}>
            {type === "LOGOUT" ? (
              <SignOutModal>
                <SidebarShow status={status} link={link} slug={slug} />
              </SignOutModal>
            ) : (
              <SidebarShow status={status} link={link} slug={slug} />
            )}
          </Link>
        ))}
      </ul>
    </div>
  );
}
