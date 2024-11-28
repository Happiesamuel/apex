"use client";

import { getNotificationsByRecieversId } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

export function useRecieverNotification(user) {
  const { data: recieverNotifications, status: recieverStatus } = useQuery({
    queryKey: ["recieverNotifications"],
    queryFn: async () => await getNotificationsByRecieversId(user?.$id),
  });
  return { recieverNotifications, recieverStatus };
}
