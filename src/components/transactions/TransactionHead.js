import { SlEqualizer } from "react-icons/sl";
import { HeaderInput } from "../HeaderInput";

function TransactionHead() {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-base text-zinc-300">Bill & Payment</h1>
      <div className="flex gap-2 items-center">
        <HeaderInput />
        <div className="p-2 rounded-full  border border-zinc-800 ">
          <SlEqualizer className="text-lg text-zinc-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default TransactionHead;
