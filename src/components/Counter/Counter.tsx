"use client";
import { useState } from "react";
import { Button } from "../Button";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  const sub = () => {
    setCounter(counter - 1);
  };
  const add = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="relative flex flex-col items-center justify-center space-y-2">
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
    </div>
  );
};

export default Counter;
