import Notify from "./Notify";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import EmptyNotifications from "./EmptyNotifications";

import { useDeleteNotifications } from "@/hooks/useDeleteNotifications";
import { Toast } from "@/lib/utils";
function OptimisticNotification({
  arrSplit,
  type,
  checked,
  findArr,
  setChecked,
}) {
  const { deleteNotification, status } = useDeleteNotifications();
  function handleDelete() {
    arrSplit
      .map((x) => x.not)
      .flat()
      .filter((x) => x.status === true)
      .map((x) =>
        deleteNotification(x.id, {
          onError: () =>
            Toast({
              description: "Failed to clear all your notifications",
              title: "Clearing Failed!",
            }),
          onSuccess: () =>
            Toast({
              description: "You've successfull cleared your notifications",
              title: "Clear notifications",
            }),
        })
      );
  }
  return (
    <div className="mt-6">
      {type === "unread" ? (
        <div
          className={`items-center space-x-2 text-zinc-200 float-right ${
            arrSplit.length ? "flex" : "hidden"
          }`}
        >
          <Checkbox
            id="terms"
            onClick={() => setChecked(!checked)}
            className=" data-[state=checked]:bg-buttonOrange border-buttonOrange/50"
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Mark as read
          </label>
        </div>
      ) : (
        <div className={`text-right  ${arrSplit.length ? "block" : "hidden"}`}>
          <Button
            className="bg-buttonOrange"
            disabled={status === "pending"}
            onClick={() => handleDelete()}
          >
            {status === "pending" ? "Clearing..." : " Clear all"}
          </Button>
        </div>
      )}
      {arrSplit.length ? (
        <Notify
          type={type}
          arrSplit={arrSplit}
          checked={checked}
          findArr={findArr}
        />
      ) : (
        <EmptyNotifications type={type} />
      )}
    </div>
  );
}

export default OptimisticNotification;
