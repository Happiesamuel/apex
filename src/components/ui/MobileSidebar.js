"use client";
import { sidebarLinks, sidebarLinksTwo } from "@/constants/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TooltipDemo } from "../ToolTip";

function MobileSidebar() {
  const links = [...sidebarLinks, ...sidebarLinksTwo];
  const pathname = usePathname();
  const slug = pathname.split("/").at(pathname.split("/").length - 1);
  return (
    <div className="fixed z-[60] bottom-[1%] w-full flex items-center justify-center">
      <div className=" w-[85%] shadow-md shadow-zinc-950 text-zinc-100 relative flex items-center justify-between bg-backgroundColor border border-zinc-800  px-3 rounded-3xl">
        {links.map((link) => (
          <Link href={link.route} key={link.slug}>
            <TooltipDemo
              className={` text-8xl relative hover:bg-transparent p-0 ${
                slug === link.slug
                  ? "bg-buttonOrange hover:bg-buttonOrange p-2 border-4 border-zinc-100 rounded-full bottom-[20px] py-5 "
                  : "text-zinc-500 bg-transparent"
              }`}
              content={link.title}
              title={<div className="">{link.svg}</div>}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MobileSidebar;
