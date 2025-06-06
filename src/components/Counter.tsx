"use client";
import { useState } from "react";
import { Button } from "./Button";

interface CounterModalProps {
  onClose: () => void;
}

const Counter = ({ onClose }: CounterModalProps) => {
  const [counter, setCounter] = useState(0);

  const sub = () => {
    setCounter(counter - 1);
  };
  const add = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
      <div className="relative flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Counter App</h2>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Button size="sm" onClick={sub}>
            -
          </Button>
          <span className="text-lg font-semibold text-gray-800">{counter}</span>
          <Button size="sm" onClick={add}>
            +
          </Button>
        </div>
        <Button
          size="sm"
          className="absolute bottom-2 left-2 px-3"
          onClick={onClose}
        >
          x
        </Button>
      </div>
    </div>
  );
};

export default Counter;
