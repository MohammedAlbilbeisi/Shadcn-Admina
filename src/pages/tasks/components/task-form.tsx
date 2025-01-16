"use client";
import { z } from "zod";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledFormFooter } from "@/components/controlled-components/controlled-form-footer";
import ControlledInputWithLabel from "@/components/controlled-components";
import { useEffect } from "react";
import { Task, taskSchema } from "../data/schema";
import { useTask } from "../hooks/use-tasks";
import ControlledSelectWithLabel from "@/components/controlled-components/controlled-form-select-with-label";
import { priorities, statuses } from "../data/data";

const defaultTask: Task = {
  id: "",
  title: "",
  label: "",
  priority: "",
  status: "",
};
type TaskFormData = z.infer<typeof taskSchema>;
export default function TaskForm() {
  const { task, onClose, onAddTask, onUpdateTask } = useTask();
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  useEffect(() => {
    if (task) {
      form.reset(task);
    }
  }, [task]);

  const onSubmit = (values: FieldValues) => {
    console.log(values);
    if (task) {
      onUpdateTask({ task: { ...task, ...values } });
    } else {
      console.log("hhdjshfks");
      onAddTask({
        task: {
          ...defaultTask,
          id: new Date().getTime() + "",
          ...values,
        },
      });
    }
    onClose();
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col justify-between"
      >
        <div className="flex h-full flex-col gap-5">
          <ControlledInputWithLabel
            name="title"
            label="Title"
            placeholder="Task title"
          />
          <ControlledSelectWithLabel
            name="status"
            label="Status"
            options={statuses}
            placeholder="Task status"
          />
          <ControlledSelectWithLabel
            name="priority"
            label="Priority"
            options={priorities}
            placeholder="Task priority"
          />
        </div>
        <ControlledFormFooter />
      </form>
    </FormProvider>
  );
}
