import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  color?: 'blue' | 'red' | 'none';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  color = 'blue',
  className = '',
}) => {
  // Tailwind 색상별 클래스
  const colorClasses = {
    blue: 'border border-[#7090ff] text-[#7090ff] bg-[rgba(0,89,255,0.2)] hover:bg-[rgba(0,89,255,0.3)]',
    red: 'border border-[#ff4664] text-[#ff4664] bg-[rgba(255,78,78,0.2)] hover:bg-[rgba(255,78,78,0.3)]',
    none: 'border-none bg-transparent p-0',
  };

  const baseClasses =
    'min-w-[120px] px-[27px] py-[14px] rounded-full outline-none text-[18px] font-[NanumSquareRoundEB] cursor-pointer';

  const classNames = `${baseClasses} ${colorClasses[color]} ${className}`;

  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
