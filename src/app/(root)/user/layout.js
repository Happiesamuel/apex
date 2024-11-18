import "@/app/globals.css";
import { Fredoka } from "next/font/google";
import LogImg from "@/../public/asset/sign.png";
import { Toaster } from "@/components/ui/toaster";
import AuthHeader from "@/components/authlayout/AuthHeader";
import Image from "next/image";

const fredoka = Fredoka({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});
export const metadata = {
  title: {
    template: "%s | Apex",
    default: "Welcome | Apex",
  },
  description: "Apex is a modern banking platform for everyone.",
  // icons: {
  //   icon: "/icons/logo.svg",
  // },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.className} flex h-screen items-center w-full bg-backgroundColor text-zinc-100`}
      >
        <div className="flex flex-col items-center justify-center w-full md:w-[50%] mx-4">
          <AuthHeader />
          {children}
          <Toaster />
        </div>
        <div className="hidden md:block h-full w-[50%]  relative aspect-square">
          <Image
            src={LogImg}
            placeholder="blur"
            className="object-left object-cover"
            // quality={80}
            alt="profile ing"
            fill
          />
        </div>
      </body>
    </html>
  );
}
