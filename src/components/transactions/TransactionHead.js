import { SlEqualizer } from "react-icons/sl";
import { HeaderInput } from "../HeaderInput";

function TransactionHead({ type }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1
        className={!type ? "text-base text-zinc-300" : "text-sm text-zinc-400"}
      >
        Transaction History
      </h1>
      {!type && (
        <div className="flex gap-2 items-center">
          <HeaderInput />
          <div className="p-2 rounded-full  border border-zinc-800 ">
            <SlEqualizer className="text-lg text-zinc-500 cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionHead;
