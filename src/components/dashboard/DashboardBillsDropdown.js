import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { bills } from "@/constants/constants";
function DashboardBillsDropdown({ children, handleClick, data }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="mx-5 bg-zinc-800/80 backdrop-blur-lg text-zinc-200 border-none">
        <div className="no-scrollbar h-[200px] overflow-scroll">
          {bills.map((bill) => (
            <DropdownMenuItem
              className="hover:!bg-buttonOrange !font-mansalva hover:!text-zinc-200 cursor-pointer"
              key={bill.id}
              onClick={() => handleClick(bill.id)}
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
