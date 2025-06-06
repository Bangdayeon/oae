"use client";

import { useModalStore } from "@/stores/modalStore";
import Counter from "./Counter";

export default function ModalProvider() {
  const { isOpen, type, close } = useModalStore();

  if (!isOpen) return null;

  switch (type) {
    case "counter":
      return <Counter onClose={close} />;
    default:
      return null;
  }
}
