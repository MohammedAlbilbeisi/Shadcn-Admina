import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input, InputProps } from '@/components/ui/input';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';
import { XIcon } from 'lucide-react';

interface ControlledInputWithLabelProps extends InputProps {
  name: string;
  label: string;
  placeholder?: string;
  withClearButton?: boolean;
  showFormMessage?: boolean;
}

const ControlledInputWithLabel: React.FC<ControlledInputWithLabelProps> = ({
  name,
  label,
  placeholder,
  withClearButton = false,
  showFormMessage = true,
  ...inputProps
}) => {
  const { control } = useFormContext();

  if (!control) {
    throw new Error(
      'ControlledInputWithLabel must be used within a React Hook Form provider'
    );
  }

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative w-full">
              {inputProps.type === 'number' ? (
                <Input
                  {...field}
                  {...inputProps}
                  placeholder={placeholder}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              ) : (
                <Input placeholder={placeholder} {...field} {...inputProps} />
              )}
              {field.value && withClearButton && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  onClick={() => {
                    field.onChange('');
                  }}
                >
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">Clear</span>
                </Button>
              )}
            </div>
          </FormControl>
          {showFormMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
};

export default ControlledInputWithLabel;
