"use client";
import { Button } from "./Button";
import { useModalStore } from "@/stores/modalStore";

const Header = () => {
  const { open } = useModalStore();

  return (
    <div className="bg-white max-w-none mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex space-x-4 items-center">
          <p className="text-2xl font-bold text-gray-800">OAE</p>
          <nav className="md:flex items-center space-x-1">
            <Button>📝</Button>
            <Button onClick={() => open("counter")}>🔢</Button>
            <Button onClick={() => open("todo")}>📄</Button>
          </nav>
        </div>
        <Button>MENU</Button>
      </div>
    </div>
  );
};

export default Header;
