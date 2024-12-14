import Link from "next/link";
import { Button } from "./button";
import Image from "next/image";
import LOGO from "@/../public/asset/apex-logo.png";
import { navbar } from "@/constants/constants";
function Navbar() {
  return (
    <div className="lg:flex  text-zinc-100 hidden justify-between items-center backdrop-blur-md fixed w-full z-[9999] px-16 py-4 left-0">
      <div className="flex gap-10 items-center">
        <div className="flex items-center gap-1">
          <Image alt="logo" width={40} height={40} src={LOGO} />
          {/* <h1 className="text-base font-semibold">Apex</h1> */}
        </div>
        <div className="flex gap-8 items-center">
          {navbar.map((nav) => (
            <Link
              key={nav.id}
              href={nav.route}
              className="text-zinc-200 text-base"
            >
              {nav.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="space-x-4">
        <Button className="bg-backgroundColor">
          <Link href="/auth/sign-in">Log In</Link>
        </Button>
        <Button className="border border-backgroundColor bg-transparent">
          <Link href="/auth/sign-up">Create Account</Link>
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
