import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
};

export const ControlledRadioGroupWithLabel = ({
  name,
  label,
  options,
  disabled,
}: Props) => {
  const { control } = useFormContext();

  if (!control) {
    throw new Error(
      "ControlledRadioGroupWithLabel must be used within a React Hook Form provider"
    );
  }

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex flex-col space-y-1"
              disabled={field.disabled || disabled}
            >
              {options.map(({ value, label }) => (
                <FormItem
                  className="flex items-center space-x-3 space-y-0"
                  key={value}
                >
                  <FormControl>
                    <RadioGroupItem value={value} />
                  </FormControl>
                  <FormLabel className="font-normal">{label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
