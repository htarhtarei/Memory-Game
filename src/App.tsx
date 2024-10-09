import { useEffect, useState } from "react";
import Card from "./Card";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import BreakTimer from "./BreakTimer";

function App() {
  const cardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [flippedCardNumbers, setFlippedCardNumbers] = useState<number[]>([]);
  const [isRefipping, setIsRefipping] = useState(false);  
  const [highlightedCardIndex, setHighlightedCardIndex] = useState<number | null>(null);
  const [isBreakTime, setIsBreakTime] = useState<boolean>(false);  
  const reverseFlip = [...flippedCardNumbers].reverse();

  useEffect(() => {
    if (flippedCardNumbers.length === cardNumbers.length) {
      setTimeout(() => {
        toast.info("All cards are flipped!");
        setIsRefipping(true);
        startColorChangeProcess();
      }, 1000);
    }
  }, [flippedCardNumbers]);

  const handleCardClick = (num: number) => {
    if (isRefipping || isBreakTime) return; 

    if (!flippedCardNumbers.includes(num)) {
      setFlippedCardNumbers((prevNumbers) => [...prevNumbers, num]);
    } else {
      toast.error(`This card is already clicked!`);
    }
  };

  const startColorChangeProcess = () => {
    reverseFlip.forEach((num, index) => {
      setTimeout(() => {
        setHighlightedCardIndex(num);
        startReflipProcess();
      }, index * 1000);
    });

    setTimeout(() => {
      setHighlightedCardIndex(null);
    }, flippedCardNumbers.length * 1000);
  };

  const startReflipProcess = () => {
    reverseFlip.forEach((num, index) => {
      setTimeout(() => {
        setFlippedCardNumbers((prevNumbers) => prevNumbers.filter((cardNum) => cardNum !== num));

        if (index === reverseFlip.length - 1) {
          setIsRefipping(false);
          setIsBreakTime(true); 
        }
      }, index * 1000);
    });
  };

  const handleBreakTimerEnd = () => {
    setIsBreakTime(false); 
  };

  return (
    <div className="w-full flex justify-center my-4">
      <div>
        <h1 className="text-4xl mx-4 uppercase font-bold text-red-950">Memory Game</h1>

        {isBreakTime ? (
          <BreakTimer onBreakEnd={handleBreakTimerEnd}/>
        ) : (
          <ul className="mt-12 grid grid-cols-3 gap-y-2 cursor-pointer">
            {cardNumbers.map((num) => (
              <Card
                key={num}
                num={num}
                onCardClick={handleCardClick}
                flippedCards={flippedCardNumbers}
                isRefipping={isRefipping}
                highlightedCardIndex={highlightedCardIndex}
              />
            ))}
          </ul>
        )}

        <ToastContainer autoClose={2000} />
      </div>
    </div>
  );
}

export default App;
