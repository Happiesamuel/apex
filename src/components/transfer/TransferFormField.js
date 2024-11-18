import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

function TransferFormField({
  form,
  placeholder,
  disabled,
  name,
  type,
  onchange,
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl onChange={(e) => onchange?.(e.target.value)}>
            <Input
              className="outline-none border-b border-zinc-500 
                  border-t-transparent  border-x-transparent  placeholder:text-zinc-500 text-zinc-400"
              placeholder={placeholder}
              type={type}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-xs text-red-500" />
        </FormItem>
      )}
    />
  );
}

export default TransferFormField;
