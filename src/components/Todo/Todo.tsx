"use client";
import { useState } from "react";
import { useTodoStore } from "@/stores/todoStore";

import Input from "../Input";
import { Button } from "../Button";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [newTodo, setNewTodo] = useState("");
  const { todos, addTodo, removeTodo } = useTodoStore();

  const handleAdd = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo("");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center space-y-2">
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
    </div>
  );
};

export default Todo;
