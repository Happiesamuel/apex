import "@/app/globals.css";

import TransferCardLayout from "@/components/transfer/TransferCardLayout";
import { getUsersByEmail } from "@/lib/action";
import { auth } from "@/lib/auth";

export default async function RootLayout({ children }) {
  const session = await auth();
  const user = await getUsersByEmail(session?.user?.email);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_20rem] text-zinc-100 divide-x divide-zinc-900">
      {children}
      <TransferCardLayout user={user} />
    </div>
  );
}
