import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { TimePicker } from "./time-picker";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
};

const ControlledDateTimePicker = ({ name, label, placeholder }: Props) => {
  const { control } = useFormContext();

  if (!control) {
    throw new Error(
      "ControlledDateTimePicker must be used within a React Hook Form provider"
    );
  }

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="leading-6">{label}</FormLabel>
          <Popover>
            <FormControl>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                  disabled={field.disabled}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "PPP HH:mm:ss")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                </Button>
              </PopoverTrigger>
            </FormControl>
            <FormMessage />
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
              <div className="p-3 border-t border-border">
                <TimePicker setDate={field.onChange} date={field.value} />
              </div>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};

export default ControlledDateTimePicker;
