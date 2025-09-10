import { create } from "zustand";

type ModalType = "counter" | "todo" | "rps" | "login" | "settings" | null;

interface ModalState {
  type: ModalType;
  isOpen: boolean;
  open: (type: ModalType) => void;
  close: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  isOpen: false,
  open: (type) => set({ type, isOpen: true }),
  close: () => set({ isOpen: false, type: null }),
}));
