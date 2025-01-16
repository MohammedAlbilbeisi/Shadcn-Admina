import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";

type Props = {
  name: string;
  label: string;
  toYear: number;
  fromYear: number;
  placeholder: string;
};

export const ControlledYearSelectWithLabel = ({
  name,
  label,
  toYear,
  fromYear,
  placeholder,
}: Props) => {
  const yearsLength = toYear - fromYear + 1;

  const years: { label: string; value: string }[] = useMemo(
    () =>
      Array.from({ length: yearsLength }, (_, i) => ({
        value: (fromYear + i).toString(),
        label: (fromYear + i).toString(),
      })),
    [fromYear, yearsLength]
  );

  const { control } = useFormContext();

  if (!control) {
    throw new Error(
      "ControlledYearSelectWithLabel must be used within a React Hook Form provider"
    );
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={(value) => {
              if (value) field.onChange(+value);
            }}
            value={field.value?.toString()}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {years.map(({ value, label }) => (
                <SelectItem value={value} key={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
