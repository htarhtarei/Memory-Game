import { useEffect, useState } from 'react';

interface Props {
    onBreakEnd: () => void; 
}

const BreakTimer = ({ onBreakEnd }: Props) => {
    const [count, setCount] = useState<number>(5);

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => {
                setCount((prev) => prev - 1);
            }, 1000);

            return () => clearTimeout(timer); 
        } else {
            onBreakEnd(); 
        }
    }, [count, onBreakEnd]);

    return (
        <div className="mt-32">
            <h1 className="text-xl text-green-600">You can start after {count} seconds again</h1>
            <p className="text-6xl text-center font-bold pt-3">00 : 0{count}</p>
        </div>
    );
};

export default BreakTimer;
