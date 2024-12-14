import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { navbar } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import LOGO from "@/../public/asset/apex-logo.png";
import { Button } from "./button";
function MobileNav() {
  return (
    <div className="flex justify-between items-center lg:hidden fixed w-full left-0 px-5 py-4  backdrop-blur-md  z-[9999]">
      <div className="flex items-center gap-1">
        <Image alt="logo" width={40} height={40} src={LOGO} />
        {/* <h1 className="text-base font-semibold">Apex</h1> */}
      </div>
      <div className="flex gap-3 items-center">
        <div className="space-x-4">
          <Button className="bg-backgroundColor">
            <Link href="/auth/sign-in">Log In</Link>
          </Button>
          <Button className="border border-backgroundColor bg-transparent">
            <Link href="/auth/sign-up">Create Account</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <FaBars className="text-xl cursor-pointer" />
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className=" nav border-none flex flex-col items-start justify-center"
          >
            <SheetTitle />
            <div className="flex flex-col gap-8 items-start mt-8">
              {navbar.map((nav) => (
                <SheetClose key={nav.id} asChild>
                  <Link href={nav.route} className="text-zinc-200 text-base">
                    {nav.name}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default MobileNav;
