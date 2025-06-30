"use client";

import { useModalStore } from "@/stores/modalStore";
import Counter from "./Counter/Counter";
import Todo from "./Todo/Todo";
import Login from "./Login/Login";
import ModalWrapper from "./ModalWrapper";

export default function ModalProvider() {
  const { isOpen, type, close } = useModalStore();

  if (!isOpen) return null;

  let content;
  switch (type) {
    case "counter":
      content = <Counter />;
      break;
    case "todo":
      content = <Todo />;
      break;
    case "login":
      content = <Login />;
      break;
    default:
      return null;
  }

  return <ModalWrapper onClose={close}>{content}</ModalWrapper>;
}
