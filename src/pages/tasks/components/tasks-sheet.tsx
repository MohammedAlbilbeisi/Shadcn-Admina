import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTask } from "../hooks/use-tasks";
import TaskForm from "./task-form";

export const TasksSheet = () => {
  const { isOpen, onClose, task } = useTask();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex size-full min-w-[500px] flex-col overflow-hidden pb-0">
        <SheetHeader>
          <SheetTitle>{task ? "Edit" : "Create"} Task</SheetTitle>
          <SheetDescription>
            Please fill information below to create/update task
          </SheetDescription>
        </SheetHeader>
        <TaskForm />
      </SheetContent>
    </Sheet>
  );
};
