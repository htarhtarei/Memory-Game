interface Props {
    num: number;
    onCardClick: (value: number) => void;
    flippedCards: number[];
    isRefipping: boolean;
}

const Card = ({ num, onCardClick, flippedCards, isRefipping }: Props) => {

    const handleClick = () => {
        if (!isRefipping) {
            onCardClick(num);
        }
    };

    const bgColorFun = () => {
        if (isRefipping && !flippedCards.includes(num)) {
            return 'bg-white'; 
        }

        if (flippedCards.includes(num)) {
            return 'bg-green-800'; 
        }

        return 'bg-white'; 
    };

    const bgColor = bgColorFun();

    return (
        <li>
            <button  
                className={`size-24 rounded-md shadow-sm duration-100 ${bgColor}`} 
                onClick={handleClick}
            />
        </li>
    );
};

export default Card;
