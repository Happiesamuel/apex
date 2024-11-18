import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function FormInput({ name, label, placeholder, form, type }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-zinc-300 text-sm">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={type}
              className="outline-none border-b border-zinc-500 
                  border-t-transparent  border-x-transparent  placeholder:text-zinc-500 text-zinc-400"
            />
          </FormControl>
          <FormMessage className="text-xs text-red-500 float-right" />
        </FormItem>
      )}
    />
  );
}

export default FormInput;
