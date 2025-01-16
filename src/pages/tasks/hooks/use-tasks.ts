import { Task } from "../data/schema";
import { create } from "zustand";
import { tasks } from "../data/tasks";

type openState = {
  task: Task | undefined;
};

type TasksSheetState = {
  isOpen: boolean;
  task: Task | undefined;
  onClose: () => void;
  onOpen: (state: openState) => void;
  onAddTask: (payload: { task: Task }) => void;
  onUpdateTask: (payload: { task: Task }) => void;
  tasksList: Task[];
};

export const useTask = create<TasksSheetState>((set) => ({
  isOpen: false,
  task: undefined,
  tasksList: tasks,
  onOpen: (state) =>
    set({
      task: state.task,
      isOpen: true,
    }),
  onClose: () =>
    set({
      isOpen: false,
    }),
  onAddTask: (payload) =>
    set((state) => ({
      tasksList: [...state.tasksList, payload.task],
      isOpen: true,
    })),
  onUpdateTask: (payload) =>
    set((state) => ({
      tasksList: state.tasksList.map((task) => {
        if (task.id === payload.task.id) {
          return payload.task;
        }
        return task;
      }),
      isOpen: true,
    })),
}));
