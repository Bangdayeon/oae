"use client";
import { create } from "zustand";

interface TodoItem {
  id: number;
  label: string;
}

interface TodoStore {
  todos: TodoItem[];
  addTodo: (label: string) => void;
  removeTodo: (id: number) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (label) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), label }],
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));
