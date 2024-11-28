import { MdKeyboardArrowRight } from "react-icons/md";
import { HeaderInput } from "../HeaderInput";
import { Button } from "./button";

function BankHeaderTwo({ children, active }) {
  return (
    <header className="bank_header text-zinc-500 ">
      <div className="flex gap-2 items-center">
        <div className="text-xl">{active?.svg}</div>
        <div className="text-xl hidden md:block">
          {" "}
          <MdKeyboardArrowRight />
        </div>
        <div className="text-base hidden md:block">{active?.title}</div>
      </div>

      <div className="flex gap-3 items-center">
        <HeaderInput />
        {children}
        <Button className="bg-buttonOrange text-zinc-100 rounded-full">
          Earn $90
        </Button>
      </div>
    </header>
  );
}

export default BankHeaderTwo;
