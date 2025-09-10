import HandIcon from "./HandIcon";

interface HandButtonProps {
  value: 'rock' | 'scissors' | 'paper';
  onClick: (value: 'rock' | 'scissors' | 'paper') => void;
}

function HandButton({ value, onClick }: HandButtonProps) {
  const handleClick = () => onClick(value);

  return (
    <button
      onClick={handleClick}
      className="w-[166px] h-[166px] border-0 outline-none text-center cursor-pointer bg-transparent bg-no-repeat bg-center bg-contain relative group"
      style={{ backgroundImage: "url('/assets/purple.svg')" }}
    >
      {/* hover용 배경 */}
      <div className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ backgroundImage: "url('/assets/yellow.svg')" }} />
      <HandIcon value={value}/>
    </button>
  );
}

export default HandButton;
