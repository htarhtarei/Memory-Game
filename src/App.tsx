import { useEffect, useState } from "react";
import Card from "./Card";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import BreakTimer from "./BreakTimer";

function App() {
  const cardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [flippedCardNumbers, setFlippedCardNumbers] = useState<number[]>([]);
  const [isRefipping, setIsRefipping] = useState(false);  
  const [isBreakTime, setIsBreakTime] = useState<boolean>(false);  

  useEffect(() => {
    if (flippedCardNumbers.length === cardNumbers.length) {
      toast.info("All cards are flipped!");

      setTimeout(() => {
        setIsRefipping(true);

        startReflipProcess()
      }, 1000);
    }
  }, [flippedCardNumbers]);

  const handleCardClick = (num: number) => {
    if (isRefipping || isBreakTime) return; //if cards are reflipping , card are not able to click (card disable)

    if (!flippedCardNumbers.includes(num)) {
      setFlippedCardNumbers((prevNumbers) => [...prevNumbers, num]);
    } else {
      toast.error(`This card is already clicked!`);
    }
  };

  const startReflipProcess = () => {        
    flippedCardNumbers.forEach((_, index) => {
      setTimeout(() => {
        setFlippedCardNumbers((prevNumbers) => {
          const updatedNumbers = [...prevNumbers];
          updatedNumbers.pop(); 
          return updatedNumbers;
        });
        
        if (index === flippedCardNumbers.length - 1) {
          setIsRefipping(false);
          setIsBreakTime(true)
          
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
          <ul className="mt-12 grid grid-cols-3 cursor-pointer">
            {cardNumbers.map((num) => (
              <Card
                key={num}
                num={num}
                onCardClick={handleCardClick}
                flippedCards={flippedCardNumbers}
                isRefipping={isRefipping}
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
