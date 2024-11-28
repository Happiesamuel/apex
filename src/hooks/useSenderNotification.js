"use client";

import { getNotificationsBySendersId } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

export function useSenderNotification(id) {
  const { data: senderNotifications, status: senderStatus } = useQuery({
    queryKey: ["senderNotifications"],
    queryFn: async () => await getNotificationsBySendersId(id),
  });
  return { senderNotifications, senderStatus };
}
