import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

interface ControlledSelectWithLabelProps {
  name: string;
  label: string;
  options: Option[];
  disabled?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
}

const ControlledSelectWithLabel: React.FC<ControlledSelectWithLabelProps> = ({
  name,
  label,
  disabled,
  onChange,
  placeholder,
  options = [],
  className,
  defaultValue,
}) => {
  const { control } = useFormContext();

  if (!control) {
    throw new Error(
      "ControlledSelectWithLabel must be used within a React Hook Form provider"
    );
  }

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormItem className={className || ""}>
            <FormLabel>{label}</FormLabel>
            <Select
              value={field.value}
              defaultValue={defaultValue}
              disabled={disabled || field.disabled}
              onValueChange={(value) => {
                if (value) {
                  field.onChange(value);
                  onChange?.(value);
                }
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map(({ value, label, disabled }) => (
                  <SelectItem value={value} key={value} disabled={disabled}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default ControlledSelectWithLabel;
