import { formatRelativeTime, formatTodayDate, Toast } from "@/lib/utils";
import Image from "next/image";
import userImg from "@/../public/asset/user-img.png";
import { useUpdateAllNotifications } from "@/hooks/useUpdateAllNotifications";
import { useEffect } from "react";
function Notify({ arrSplit, findArr, checked }) {
  const { updateNotification } = useUpdateAllNotifications();
  useEffect(
    function () {
      if (checked) {
        arrSplit
          .map((x) => x.not)
          .flat()
          .map((x) =>
            updateNotification(
              {
                id: x.id,
                obj: { status: true },
              },
              {
                onSuccess: () =>
                  Toast({
                    description:
                      "You've successfully marked all your notifications as read",
                    title: "Read notifications",
                  }),
                onError: () =>
                  Toast({
                    description: "Failed to mark notification as read",
                    title: "Read notifications Failed!",
                  }),
              }
            )
          );
      }
    },
    [checked, arrSplit, updateNotification]
  );
  return (
    <div className="text-zinc-100 space-y-2  pb-6">
      {arrSplit.map((arr) => (
        <div key={arr.date}>
          <h1 className="text-xl text-zinc-200 my-2">
            {formatTodayDate(arr.date)}
          </h1>

          <div className="bg-bgBlur flex flex-col rounded-xl border border-zinc-800 ">
            {arr.not.map((notArr) => (
              <div
                key={notArr.id}
                className="border-b border-zinc-800 last:border-none grid grid-cols-[1fr_0.4fr] items-center px-3 py-3"
              >
                <div className="flex gap-3 items-center">
                  {!findArr.some((x) => x.title === notArr.name) ? (
                    <div
                      className={
                        notArr.name === "Apex"
                          ? ""
                          : "w-[40px] h-[40px] relative aspect-auto"
                      }
                    >
                      <Image
                        src={notArr.img ? notArr.img : userImg}
                        fill={notArr.name === "Apex" ? false : true}
                        width={notArr.name === "Apex" ? 40 : ""}
                        height={notArr.name === "Apex" ? 40 : ""}
                        className={`rounded-full object-cover object-center ${
                          notArr.name === "Apex" && "bg-buttonOrange p-2 "
                        }`}
                        alt="img"
                      />
                    </div>
                  ) : (
                    findArr.map((bill) => {
                      if (bill.title === notArr.name)
                        return (
                          <div
                            key={bill.id}
                            className={`bg-[${bill.svgColDark}]  p-3 rounded-lg text-xl`}
                          >
                            {bill.svg}
                          </div>
                        );
                      else return "";
                    })
                  )}
                  <div className="flex flex-col gap-1">
                    <h1 className="text-xl">{notArr.title}</h1>
                    <p className="text-zinc-400 text-sm">{notArr.message}</p>
                  </div>
                </div>
                <p className="text-zinc-400 text-right text-sm">
                  {formatRelativeTime(notArr.date)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notify;
