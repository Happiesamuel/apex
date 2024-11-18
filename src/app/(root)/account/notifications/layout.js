import "@/app/styles/globals.css";
import NotificationButtons from "@/components/notifications/NotificationButtons";
import { Toaster } from "@/components/ui/toaster";
import {
  getNotificationsByRecieversId,
  getNotificationsBySendersId,
  getUsersByEmail,
} from "@/lib/action";
import { auth } from "@/lib/auth";

export default async function RootLayout({ children }) {
  const session = await auth();
  const user = await getUsersByEmail(session.user.email);
  const allNotifications = await Promise.all([
    getNotificationsByRecieversId(session?.user?.userId),
    getNotificationsBySendersId(session?.user?.userId),
  ]);
  const arr1 = allNotifications
    .flat()
    .filter((x) => x.senderId === user["$id"] && x.title === "Withdrawal");
  const arr2 = allNotifications
    .flat()
    .filter((x) => x.recieverId === user["$id"] && x.title === "Deposit");
  const arr3 = allNotifications
    .flat()
    .filter((x) => x.senderId === process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
  const readNotifications = [...arr1, ...arr2, ...arr3].filter((x) => x.status);
  const unreadNotifications = [...arr1, ...arr2, ...arr3].filter(
    (x) => !x.status
  );
  return (
    <div className="flex flex-col text-zinc-200">
      <h1 className="text-zinc-200 text-3xl my-3">Notifications</h1>
      <NotificationButtons
        readNotifications={readNotifications}
        unreadNotifications={unreadNotifications}
      />
      <main className="my-3 mx-3">{children}</main>
      <Toaster />
    </div>
  );
}
1111;
