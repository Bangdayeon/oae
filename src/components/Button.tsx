"use client";
import React from "react";
import classNames from "classnames";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  children,
  onClick,
  variant = "default",
  size = "md",
  disabled = false,
  className = "",
}: ButtonProps) => {
  const baseStyle =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variantStyles = {
    default: "bg-gray-800 text-white hover:bg-gray-600",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
    ghost: "bg-transparent text-gray-800 hover:bg-gray-100",
  };
  const sizeStyles = {
    sm: "text-sm px-3 py-1.5",
    md: "text-md px-1.5 py-1.5",
    lg: "text-base px-5 py-3",
  };

  const classes = classNames(
    baseStyle,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
};
