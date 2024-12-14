"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { bills } from "@/constants/constants";
import { useCreateBill } from "@/hooks/useCreateBill";
import { Toast } from "@/lib/utils";
function DashboardBillsDropdown({ children, user }) {
  const { createBill } = useCreateBill();
  function handleCreateBill(id, title) {
    createBill(
      {
        userId: user.$id,
        billId: id,
        title: title,
      },
      {
        onSuccess: () => {
          Toast({
            description: `You've scheduled ${title} payment for later.`,
            title: "Success",
          });
        },
        onError: () => {
          Toast({
            description: `Failed to scheduled ${title} payment.`,
            title: "Failed",
          });
        },
      }
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="mx-5 bg-zinc-800/80 backdrop-blur-lg text-zinc-200 border-none">
        <div className="no-scrollbar h-[200px] overflow-scroll">
          {bills.map((bill) => (
            <DropdownMenuItem
              className="hover:!bg-buttonOrange !font-mansalva hover:!text-zinc-200 cursor-pointer"
              key={bill.id}
              onClick={() => handleCreateBill(bill.id, bill.title)}
            >
              {bill.title}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DashboardBillsDropdown;
