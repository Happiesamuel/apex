"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import apexLogo from "@/../public/asset/apex-logo.png";
function AuthHeader() {
  const pathname = usePathname();
  const type = pathname.split("/").at(2);
  return (
    <div>
      <div className="flex flex-col items-center">
        <Image
          src={apexLogo}
          alt="apex-logo"
          width={50}
          height={50}
          className="mb-2 rounded-full p-3 bg-buttonOrange"
        />
        <h1 className="text-zinc-200 text-4xl font-bold text-center">
          {type === "sign-in"
            ? "Log in to your Apex account"
            : type === "sign-up"
            ? "Sign up and start banking with us"
            : "Reset your password"}
        </h1>
      </div>
    </div>
  );
}

export default AuthHeader;
