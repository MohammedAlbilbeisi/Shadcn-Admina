import { useFormContext } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormField,
  FormControl,
} from "@/components/ui/form";
import { Checkbox } from "../ui/checkbox";

type Props = {
  name: string;
  label: string;
};

export const ControlledCheckboxWithLabel = ({ name, label }: Props) => {
  const { control } = useFormContext();

  if (!control) {
    throw new Error(
      "ControlledCheckboxWithLabel must be used within a React Hook Form provider"
    );
  }

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="space-y-0 flex items-center space-x-2">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={field.disabled}
            />
          </FormControl>
          <FormLabel>{label}</FormLabel>
        </FormItem>
      )}
    />
  );
};
