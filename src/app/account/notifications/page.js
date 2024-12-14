import ReadNotifications from "@/components/notifications/ReadNotifications";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getNotificationsByRecieversId,
  getNotificationsBySendersId,
  getUsersByEmail,
} from "@/lib/action";
import { auth } from "@/lib/auth";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
export async function generateMetadata() {
  return {
    title: `Notifications`,
  };
}
async function page() {
  const session = await auth();
  const queryClient = new QueryClient();
  const user = await getUsersByEmail(session.user.email);
  await queryClient.prefetchQuery({
    queryKey: ["recieverNotifications"],
    queryFn: async () => await getNotificationsByRecieversId(user?.$id),
  });
  await queryClient.prefetchQuery({
    queryKey: ["senderNotifications"],
    queryFn: async () => await getNotificationsBySendersId(user?.$id),
  });

  const tabs = [
    {
      title: "Read",
      id: 1,
      value: "read",
    },
    {
      title: "Unread",
      id: 2,
      value: "unread",
    },
  ];
  return (
    <div>
      <h1 className="text-zinc-200 text-3xl my-3">Notifications</h1>
      <Tabs defaultValue="read" className="w-full">
        <TabsList className="bg-transparent border-b  border-zinc-700 w-full rounded-none justify-start relative">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.value}
              className="text-base text-zinc-100 focus:ring-0 pb-4 transition-all duration-500 focus:ring-offset-0 data-[state=active]:bg-transparent data-[state=active]:text-buttonOrange data-[state=active]:before:bg-buttonOrange data-[state=active]:before:w-8 data-[state=active]:before:h-[1px] data-[state=active]:before:absolute data-[state=active]:before:bottom-[-1px]  "
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="read">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ReadNotifications user={user} type="read" />
          </HydrationBoundary>
        </TabsContent>
        <TabsContent value="unread">
          <ReadNotifications user={user} type="unread" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default page;
//
