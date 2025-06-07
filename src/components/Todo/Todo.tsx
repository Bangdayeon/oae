"use client";
import { useState } from "react";
import { useTodoStore } from "@/stores/todoStore";

import Input from "../Input";
import { Button } from "../Button";
import TodoItem from "./TodoItem";

interface CounterModalProps {
  onClose: () => void;
}

const Todo = ({ onClose }: CounterModalProps) => {
  const [newTodo, setNewTodo] = useState("");
  const { todos, addTodo, removeTodo } = useTodoStore();

  const handleAdd = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo("");
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
      <div className="relative flex flex-col items-center justify-center space-y-2 bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Todo App</h2>
        <div className="flex space-x-3">
          <Input
            value={newTodo}
            onChange={setNewTodo}
            placeholder="할 일을 입력하세요"
          />
          <Button size="sm" onClick={handleAdd}>
            +
          </Button>
        </div>
        <div className="w-full space-y-2 p-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              label={todo.label}
              onDelete={() => removeTodo(todo.id)}
            />
          ))}
        </div>
        <div className="p-2">
          <Button
            size="sm"
            className="absolute bottom-2 left-2"
            onClick={onClose}
          >
            x
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
