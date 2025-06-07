"use client";
import React from "react";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Input = ({ value, onChange, placeholder }: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="text-gray-400 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
    />
  );
};

export default Input;
