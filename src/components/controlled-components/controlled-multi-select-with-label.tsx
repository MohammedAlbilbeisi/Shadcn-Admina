import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  CheckIcon,
  XCircle,
  ChevronDown,
  XIcon,
  WandSparkles
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command';
import { FormField, FormItem, FormLabel } from '../ui/form';
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext
} from 'react-hook-form';

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva(
  'm-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300',
  {
    variants: {
      variant: {
        default:
          'border-foreground/10 text-foreground bg-card hover:bg-card/80',
        secondary:
          'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        inverted: 'inverted'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  options: {
    label: string;
    value: any;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  name: string;
  label: string;
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  animation?: number;
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
  className?: string;
}

export const ControlledMultiSelectWithLabel = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      name,
      label,
      onValueChange,
      variant,
      placeholder = 'Select options',
      animation = 0,
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const { control, setValue, getValues } = useFormContext();

    if (!control) {
      throw new Error(
        'ControlledMultiSelectWithLabel must be used within a React Hook Form provider'
      );
    }

    React.useEffect(() => {
      if (!getValues()[name]) setValue(name, []);
    }, []);

    const toggleOption = (
      option: string,
      field: ControllerRenderProps<FieldValues, string>
    ) => {
      const newSelectedValues =
        field.value.includes(option)
          ? field.value.filter((value: string) => value !== option)
          : [...field.value, option];
      field.onChange(newSelectedValues);
      onValueChange?.(newSelectedValues);
    };

    const handleClear = (field: ControllerRenderProps<FieldValues, string>) => {
      field.onChange([]);
      onValueChange?.([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = (
      field: ControllerRenderProps<FieldValues, string>
    ) => {
      const newSelectedValues = field.value.slice(0, maxCount);
      field.onChange(newSelectedValues);
      onValueChange?.(newSelectedValues);
    };

    const toggleAll = (field: ControllerRenderProps<FieldValues, string>) => {
      if (field.value.length === options.length) {
        handleClear(field);
      } else {
        const allValues = options.map((option) => option.value);
        field.onChange(allValues);
        onValueChange?.(allValues);
      }
    };

    return (
      <FormField
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <Popover
                open={isPopoverOpen}
                onOpenChange={setIsPopoverOpen}
                modal={modalPopover}
              >
                <PopoverTrigger asChild>
                  <Button
                    ref={ref}
                    {...props}
                    onClick={handleTogglePopover}
                    className={cn(
                      'flex w-full items-center justify-between rounded-md border bg-inherit p-1 hover:bg-inherit',
                      className
                    )}
                  >
                    {field.value && field.value.length > 0 ? (
                      <div className="flex w-full items-center justify-between">
                        <div className="flex flex-wrap items-center">
                          {field.value
                            .slice(0, maxCount)
                            .map((value: string) => {
                              const option = options.find(
                                (o) => o.value === value
                              );
                              const IconComponent = option?.icon;
                              return (
                                <Badge
                                  key={value}
                                  className={cn(
                                    isAnimating ? 'animate-bounce' : '',
                                    multiSelectVariants({ variant })
                                  )}
                                  style={{ animationDuration: `${animation}s` }}
                                >
                                  {IconComponent && (
                                    <IconComponent className="mr-2 h-4 w-4" />
                                  )}
                                  {option?.label}
                                  <XCircle
                                    className="ml-2 h-4 w-4 cursor-pointer"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      toggleOption(value, field);
                                    }}
                                  />
                                </Badge>
                              );
                            })}
                          {field.value.length > maxCount && (
                            <Badge
                              className={cn(
                                'border-foreground/1 bg-transparent text-foreground hover:bg-transparent',
                                isAnimating ? 'animate-bounce' : '',
                                multiSelectVariants({ variant })
                              )}
                              style={{ animationDuration: `${animation}s` }}
                            >
                              {`+ ${field.value.length - maxCount} more`}
                              <XCircle
                                className="ml-2 h-4 w-4 cursor-pointer"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  clearExtraOptions(field);
                                }}
                              />
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <XIcon
                            className="mx-2 h-4 cursor-pointer text-muted-foreground"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleClear(field);
                              field.onChange([]);
                            }}
                          />
                          <Separator
                            orientation="vertical"
                            className="flex h-full min-h-6"
                          />
                          <ChevronDown className="mx-2 h-4 cursor-pointer text-muted-foreground" />
                        </div>
                      </div>
                    ) : (
                      <div className="mx-auto flex w-full items-center justify-between">
                        <span className="mx-3 text-sm text-muted-foreground">
                          {placeholder}
                        </span>
                        <ChevronDown className="mx-2 h-4 cursor-pointer text-muted-foreground" />
                      </div>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                  onEscapeKeyDown={() => setIsPopoverOpen(false)}
                >
                  <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          key="all"
                          onSelect={() => toggleAll(field)}
                          className="cursor-pointer"
                        >
                          <div
                            className={cn(
                              'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                              field.value?.length === options.length
                                ? 'bg-primary text-primary-foreground'
                                : 'opacity-50 [&_svg]:invisible'
                            )}
                          >
                            <CheckIcon className="h-4 w-4" />
                          </div>
                          <span>(Select All)</span>
                        </CommandItem>
                        {options.map((option) => {
                          const isSelected = field.value?.includes(
                            option.value
                          );
                          return (
                            <CommandItem
                              key={option.value}
                              onSelect={() => toggleOption(option.value, field)}
                              className="cursor-pointer"
                            >
                              <div
                                className={cn(
                                  'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                  isSelected
                                    ? 'bg-primary text-primary-foreground'
                                    : 'opacity-50 [&_svg]:invisible'
                                )}
                              >
                                <CheckIcon className="h-4 w-4" />
                              </div>
                              {option.icon && (
                                <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                              )}
                              <span>{option.label}</span>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandGroup>
                        <div className="flex items-center justify-between">
                          {field.value && field.value.length.length > 0 && (
                            <>
                              <CommandItem
                                onSelect={() => handleClear(field)}
                                className="flex-1 cursor-pointer justify-center"
                              >
                                Clear
                              </CommandItem>
                              <Separator
                                orientation="vertical"
                                className="flex h-full min-h-6"
                              />
                            </>
                          )}
                          <CommandItem
                            onSelect={() => setIsPopoverOpen(false)}
                            className="max-w-full flex-1 cursor-pointer justify-center"
                          >
                            Close
                          </CommandItem>
                        </div>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
                {animation > 0 && field.value && field.value.length > 0 && (
                  <WandSparkles
                    className={cn(
                      'my-2 h-3 w-3 cursor-pointer bg-background text-foreground',
                      isAnimating ? '' : 'text-muted-foreground'
                    )}
                    onClick={() => setIsAnimating(!isAnimating)}
                  />
                )}
              </Popover>
            </FormItem>
          );
        }}
      />
    );
  }
);
