import { create } from "zustand";

type setDirectionState = {
  dir: "rtl" | "ltr";
};

type TasksSheetState = {
  dir: "rtl" | "ltr";
  setDir: (state: setDirectionState) => void;
};

export const useDirection = create<TasksSheetState>((set) => ({
  dir: "ltr",
  setDir: (state) =>
    set({
      dir: state.dir,
    }),
}));
