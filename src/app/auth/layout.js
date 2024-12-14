import { Fredoka } from "next/font/google";
import "@/app/globals.css";
import Image from "next/image";
import LogImg from "@/../public/asset/sign.png";
import AuthHeader from "@/components/authlayout/AuthHeader";
import { Toaster } from "@/components/ui/toaster";
import dynamic from "next/dynamic";

const fredoka = Fredoka({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-fredoka",
});

const App = dynamic(() => import("@/../App"), { ssr: true });
export default function RootLayout({ children }) {
  return (
    <div
      className={`antialiased ${fredoka.className} text-zinc-100  flex h-screen items-center w-full bg-backgroundColor`}
    >
      <App>
        <Toaster />
        <div className="flex flex-col items-center justify-center w-full md:w-[50%] mx-4">
          <AuthHeader />
          {children}
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
      </App>
    </div>
  );
}
