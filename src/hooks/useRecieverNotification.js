"use client";

import { getNotificationsByRecieversId } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

export function useRecieverNotification(id) {
  const { data: recieverNotifications, status: recieverStatus } = useQuery({
    queryKey: ["recieverNotifications"],
    queryFn: async () => await getNotificationsByRecieversId(id),
  });
  return { recieverNotifications, recieverStatus };
}
