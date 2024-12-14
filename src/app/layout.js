import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-fredoka",
});

export const metadata = {
  title: {
    template: "%s | Apex Bank",
    default: "Welcome | Apex Bank",
  },
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body
        className={`${fredoka.className}  min-h-screen my-0 mx-auto max-w-[120rem] bg-backgroundColor`}
      >
        <div>{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
