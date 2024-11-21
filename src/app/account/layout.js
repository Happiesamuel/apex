import "@/app/globals.css";
import BankHeader from "@/components/ui/BankHeader";
import MobileSidebar from "@/components/ui/MobileSidebar";
import Sidebar from "@/components/ui/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/lib/auth";
import dynamic from "next/dynamic";
import { Fredoka } from "next/font/google";
import { Inter } from "next/font/google";

const fredoka = Fredoka({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-fredoka",
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: "400",
});
export const metadata = {
  title: {
    template: "%s | Apex",
    default: "Welcome | Apex",
  },
  description: "Apex is a modern banking platform for everyone.",
};

const App = dynamic(() => import("@/../App"), { ssr: true });

export default async function RootLayout({ children }) {
  const session = await auth();
  const notifications = [];
  return (
    <App>
      <div
        className={`${inter.variable} ${fredoka.className} grid grid-cols-1 md:grid md:grid-cols-[5rem_1fr] lg:grid-cols-[16rem_1fr] min-h-screen my-0 mx-auto max-w-[120rem] pt-3 md:pt-6  divide-x divide-zinc-900 bg-backgroundColor`}
      >
        <div className="hidden md:block relative">
          <Sidebar user={session?.user} />
        </div>
        <div className=" md:hidden ">
          <MobileSidebar user={session?.user} />
        </div>
        <div className="flex flex-col divide-y divide-zinc-900 px-4">
          <BankHeader notifications={notifications} />
          <div className="h-full overflow-scroll no-scrollbar">
            <main className="h-[85vh] md:h-[20px]  z-[50] relative">
              {children}
            </main>
            <Toaster />
          </div>
        </div>
      </div>
    </App>
  );
}
