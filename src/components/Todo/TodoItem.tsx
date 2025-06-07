"use client";
import { Button } from "../Button";

interface TodoItemProps {
  readonly label: string;
  readonly onDelete?: () => void;
}

const TodoItem = ({ label, onDelete }: TodoItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-gray-800">{label}</p>
      <Button size="sm" onClick={onDelete}>
        x
      </Button>
    </div>
  );
};

export default TodoItem;
