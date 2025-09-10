import {useState} from 'react';

import HandButton from './HandButton';
import HandIcon from './HandIcon';
import Button from './Button';
import { compareHand, generateRandomHand } from './utils.js';

import Image from 'next/image';

const INITIAL_VALUE = "rock";
type HandValue = "rock" | "scissors" | "paper";

function getResult(me: HandValue, other: HandValue): string {
  const comparison = compareHand(me, other);
  if(comparison > 0) return "이김";
  if(comparison < 0) return "짐";
  return "무승부";
}

function RPSApp() {
  const [hand, setHand] = useState<HandValue>("rock");
  const [otherHand, setOtherHand] = useState<HandValue>("rock");
  const [gameHistory, setGameHistory] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [bet, setBet] = useState(1);

  // 게임 결과
  const handlePlay = (clicked:HandValue) => {
    const newOtherHand = generateRandomHand() as HandValue;
    const newHistoryItem = getResult(clicked, newOtherHand);
    const comparison = compareHand(clicked, newOtherHand);

      setHand(clicked);
      setOtherHand(newOtherHand);
      setGameHistory([...gameHistory, newHistoryItem]);
  
      // 배팅 점수 계산
      if(comparison>0) {
        setScore(score+bet);
      }
      if(comparison<0){
        setOtherScore(otherScore + bet);
      }
    }

  // 초기화
  const handleClear = () => {
      setHand(INITIAL_VALUE);
      setOtherHand("rock");
      setGameHistory([]);
      setScore(0);
      setOtherScore(0);
      setBet(1);
  }
  // 배팅 점수 변경
  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let num = Number(e.target.value);
    setBet(num);
  }

  const myWin = compareHand(hand, otherHand) > 0;
  const otherWin = compareHand(hand, otherHand) < 0;

  return (
    <div className="relative w-full min-w-[575px] max-w-[620px] mx-auto my-[45px] p-[50px] rounded-[44px] text-center bg-[#6f00ff] shadow-[0_4.2px_2px_#5900cc,0_-4.2px_2px_#8500ff]">

    {/* Heading */}
    <h1 className="mb-[34px] text-[30px] font-bold text-white text-center tracking-[0.19px] [text-shadow:0_3px_0_#a875e9] [-webkit-text-stroke:1px_white]">
      가위바위보
    </h1>

    {/* Reset Button */}
    <Button
      onClick={handleClear}
      className="absolute top-[48px] right-[49px]"
      color="none"
    >
      <Image src='/assets/ic-reset.svg' alt="reset" width={48} height={48}/>
    </Button>

    {/* Scores */}
    <div className="flex justify-center items-center mb-[26px]">
      <div className="inline-block min-w-[130px] h-[130px] p-[28px_35px] rounded-[27px] bg-[#6000db] shadow-[inset_0_2px_3px_rgba(0,0,0,0.07)]">
        <div className="text-[#fc0] font-bold text-[47px] leading-[1] text-center [text-shadow:0_3px_0_#af8d07]">{score}</div>
        <div className="mt-[14px] text-[#9680ff] font-bold text-[15px] tracking-[-0.3px] font-GmarketSans">다연</div>
      </div>

      <div className="mx-[7px] text-white text-[64px]">:</div>

      <div className="inline-block min-w-[130px] h-[130px] p-[28px_35px] rounded-[27px] bg-[#6000db] shadow-[inset_0_2px_3px_rgba(0,0,0,0.07)]">
        <div className="text-[#fc0] font-bold text-[47px] leading-[1] text-center [text-shadow:0_3px_0_#af8d07]">{otherScore}</div>
        <div className="mt-[14px] text-[#9680ff] font-bold text-[15px] tracking-[-0.3px] font-GmarketSans">세린</div>
      </div>
    </div>

    {/* Hands */}
    <div className="mb-[23px]">
      <div className="rounded-[35px] p-[5px] shadow-[0_3px_8px_rgba(56,15,110,0.44)]">
        <div className="w-full max-w-[520px] mx-auto border-[6px] border-[#6e08fc] rounded-[35px] shadow-[inset_0_3px_8px_rgba(56,15,110,0.44)]">
          <div className="flex justify-center items-center gap-[10px]">
            {/* 내 손 */}
            <div
              className="inline-block w-[207px] h-[207px] text-center bg-no-repeat bg-center bg-contain"
              style={{ backgroundImage: `url(${myWin ? '/assets/yellow-win.svg' : '/assets/yellow.svg'})` }}
            >
              <HandIcon
                value={hand}
                style="opacity-[0.87] w-[70px] h-[70px] mt-[70px] mx-auto select-none"
              />
            </div>

            <div className="text-white font-bold text-[22px] tracking-[-0.33px] [text-shadow:0_3px_0_hsla(0,0%,87.5%,0.5)]">
              VS
            </div>

            {/* 상대 손 */}
            <div
              className="inline-block w-[207px] h-[207px] text-center bg-no-repeat bg-center bg-contain"
              style={{ backgroundImage: `url(${otherWin ? '/assets/yellow-win.svg' : '/assets/yellow.svg'})` }}
            >
              <HandIcon
                value={otherHand}
                style="opacity-[0.87] w-[70px] h-[70px] mt-[70px] mx-auto select-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>


    {/* Betting */}
    <div className="mt-[15px] text-white text-[17px] flex justify-center items-center gap-[9px]">
      <span>배점</span>
      <input
        type="number"
        value={bet}
        min={1}
        max={9}
        onChange={handleBetChange}
        className="w-[73px] px-[10px] py-[14px] border-2 border-[#753cf7] rounded-[10px] text-white text-[17px] bg-[#6000db]"
      />
    </div>

    {/* History */}
    <div className="m-[20px_40px_36px] p-[30px_47px] rounded-[19px] bg-white text-[#625f63] shadow-[0_3px_8px_rgba(89,72,112,0.44),0_5px_3px_rgba(215,189,248,0.65)]">
      <h2 className="m-0 text-[#6000db] font-bold text-[16px] tracking-[-0.24px]">승부 기록</h2>
      <span>{gameHistory.join(', ')}</span>
    </div>

    {/* Hand Buttons */}
    <div className="flex justify-center gap-[10px] mt-[20px]">
      <HandButton onClick={()=>handlePlay('rock')} value="rock"/>
      <HandButton onClick={()=>handlePlay('scissors')} value="scissors"/>
      <HandButton onClick={()=>handlePlay('paper')} value="paper"/>
    </div>
  </div>
  )
}

export default RPSApp;