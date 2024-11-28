"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { TooltipDemo } from "./ToolTip";

export default function SidebarLinks({ data, type }) {
  const pathname = usePathname();
  const slug = pathname.split("/").at(pathname.split("/").length === 2 ? 1 : 2);
  return (
    <div className="mt-6 ">
      <p className="text-xs text-zinc-500 font-[500] mb-2">{type}</p>
      <ul className="flex flex-col gap-1">
        {data.map((link) => (
          <Link
            href={link.route}
            key={link.title}
            className={`flex items-center gap-2 text-base text-zinc-500 px-2 py-2 rounded-xl shadow-sm shadow-black ${
              slug === link.slug && " text-zinc-100  active_sidelink"
            }`}
          >
            <div className="lg:hidden block">
              <TooltipDemo
                className={`bg-transparent p-0 hover:bg-transparent ${
                  slug === link.slug ? " text-zinc-100 " : "text-zinc-500"
                }  `}
                content={link.title}
                title={<div className="text-xl">{link.svg}</div>}
              />
            </div>
            <div className="text-xl hidden lg:block">{link.svg}</div>
            <p className="lg:block hidden">{link.title}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
}
