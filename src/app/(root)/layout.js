import "@/app/globals.css";

import { Fredoka } from "next/font/google";

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
      <body className={`${fredoka.className} `}>{children}</body>
    </html>
  );
}
