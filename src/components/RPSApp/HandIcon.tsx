import Image from 'next/image';

const HAND_IMAGES = {
    rock: '/assets/rock.svg',
    scissors: '/assets/scissor.svg',
    paper: '/assets/paper.svg',
} as const;

type HandValue = keyof typeof HAND_IMAGES;

interface HandIconProps {
    value?: HandValue;
    style?: string;
}

function HandIcon( {value="rock", style='opacity-[0.87] w-[70px] h-[70px] mx-auto select-none'}:HandIconProps ) {
  const src= HAND_IMAGES[value];
  const alt = `icon: ${value}`;

  return (
    <Image src={src} className={style} alt={alt} width={40} height={40}/>
  );
}

export default HandIcon;