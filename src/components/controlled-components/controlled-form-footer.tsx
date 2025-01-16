import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

type Props = {
  isLoading?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
  submitIcon?: JSX.Element;
  disabled?: boolean;
};

export const ControlledFormFooter = ({
  isLoading,
  submitLabel,
  submitIcon,
  disabled = false,
}: Props) => {
  const { control } = useFormContext();

  if (!control) {
    throw new Error(
      "ControlledFormFooter must be used within a React Hook Form provider"
    );
  }

  return (
    <div className="flex w-full items-center justify-end gap-4 border-t py-4">
      <Button type="submit">
        {submitIcon} {submitLabel || "Save"}
      </Button>
    </div>
  );
};
