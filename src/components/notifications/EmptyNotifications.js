import { IoMdNotificationsOff } from "react-icons/io";

function EmptyNotifications({ type }) {
  return (
    <div className="text-zinc-100 flex flex-col gap-3 items-center justify-center mt-16">
      <div className="bg-buttonOrange p-3 rounded-full text-3xl">
        <IoMdNotificationsOff />
      </div>
      <p className="text-sm text-zinc-400">
        You don&apos;t have any {type === "unread" && "unread"} notifications.
      </p>
    </div>
  );
}

export default EmptyNotifications;
