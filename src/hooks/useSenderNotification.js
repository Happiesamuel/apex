"use client";

import { getNotificationsBySendersId } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

export function useSenderNotification(user) {
  const { data: senderNotifications, status: senderStatus } = useQuery({
    queryKey: ["senderNotifications"],
    queryFn: async () => await getNotificationsBySendersId(user?.$id),
  });
  return { senderNotifications, senderStatus };
}
