import { Switch } from "@/components/ui/switch";
import { useFormContext } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormField,
  FormControl,
} from "@/components/ui/form";

type Props = {
  name: string;
  label: string;
};

export const ControlledSwitch = ({ name, label }: Props) => {
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
        <FormItem className="flex flex-col items-start gap-4">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Switch
              aria-readonly
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={field.disabled}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
