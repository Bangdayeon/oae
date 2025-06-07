"use client";

import React from "react";
import { Button } from "./Button";

interface ModalWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
  showCloseButton?: boolean;
}

const ModalWrapper = ({
  children,
  onClose,
  showCloseButton = true,
}: ModalWrapperProps) => {
  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="flex flex-col bg-white p-4 rounded-lg w-full max-w-sm max-y-50"
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <Button size="sm" className="w-3" onClick={onClose}>
            x
          </Button>
        )}
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
