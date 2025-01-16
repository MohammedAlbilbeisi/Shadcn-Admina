import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
};

export const ControlledTextArea = ({
  name,
  label,
  placeholder,
  disabled,
}: Props) => {
  const { control } = useFormContext();

  if (!control) {
    throw new Error(
      "ControlledTextArea must be used within a React Hook Form provider"
    );
  }

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              rows={4}
              className="resize-none"
              placeholder={placeholder}
              disabled={field.disabled || disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
