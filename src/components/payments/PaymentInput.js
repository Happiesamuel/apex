import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

function PaymentInput({ name, label, placeholder, type, form, disabled }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base text-zinc-200">{label}</FormLabel>
          <FormControl>
            <Input
              className="border-zinc-800 mx-0 md:mx-6 disabled:cursor-not-allowed  outline-none focus:border-2 focus:border-buttonOrange"
              placeholder={placeholder}
              type={type}
              disabled={disabled}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default PaymentInput;
