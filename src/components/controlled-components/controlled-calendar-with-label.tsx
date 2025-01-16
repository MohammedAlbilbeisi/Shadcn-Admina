import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useFormContext } from 'react-hook-form';

interface ControlledCalendarWithLabelProps
  extends Omit<
    React.ComponentProps<typeof DayPicker>,
    'selected' | 'onSelect'
  > {
  name: string;
  label: string;
  placeholder: string;
  disabled?: boolean;
}

export const ControlledCalendarWithLabel = ({
  name,
  label,
  placeholder,
  disabled,
  ...props
}: ControlledCalendarWithLabelProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { control } = useFormContext();

  if (!control) {
    throw new Error(
      'ControlledCalendarWithLabel must be used within a React Hook Form provider'
    );
  }

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                  disabled={field.disabled || disabled}
                >
                  {field.value ? (
                    `${format(field.value, 'PPP')}`
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
              <Calendar
                mode="single"
                fromYear={1990}
                selected={field.value}
                defaultMonth={field.value}
                onSelect={field.onChange}
                toYear={new Date().getFullYear()}
                onDayClick={() => setIsOpen(false)}
                {...props}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
