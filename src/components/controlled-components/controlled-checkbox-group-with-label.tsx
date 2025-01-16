import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';

type Alignment = 'vertical' | 'horizontal';

type Props = {
  name: string;
  label: string;
  alignment?: Alignment;
  options: { id: string; label: string }[];
};

export const ControlledCheckBoxGroupWithLabel = ({
  name,
  label,
  options,
  alignment = 'vertical'
}: Props) => {
  const { control } = useFormContext();

  if (!control) {
    throw new Error(
      'ControlledRadioGroupWithLabel must be used within a React Hook Form provider'
    );
  }

  return (
    <>
      <FormLabel className="text-base">{label}</FormLabel>
      <div className={`${alignment==='vertical' ? "" : "flex gap-4 flex-wrap mt-3"}`}>
        {options?.map((item) => (
          <FormField
            key={item.id}
            name={name}
            control={control}
            render={({ field }) => {
              return (
                <FormItem
                  key={item.id}
                  className="flex flex-row items-start space-x-1 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...(field.value || []), item.id])
                          : field.onChange(
                              field.value?.filter(
                                (value: string) => value !== item.id
                              )
                            );
                      }}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    {item.label}
                  </FormLabel>
                </FormItem>
              );
            }}
          />
        ))}
      </div>
    </>
  );
};
