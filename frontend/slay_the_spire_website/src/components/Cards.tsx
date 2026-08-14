import { useEffect, useState } from "react";
import './Cards.css'


type Card = {
    card_name: string;
};

type CardsProps = {
    selectedCharacter: String;
};

export default function Cards({ selectedCharacter }: CardsProps) {
    
    
    const [cards, setCards] = useState<Card[]>([]);
    useEffect(() => {
        fetch(`http://localhost:3000/${selectedCharacter}/cards`)
            .then(response => response.json())
            .then(data => {
                setCards(data);
            });
    }, [selectedCharacter]);

    // There will be images missing since the game updats and changes cards. should be solid once 1.0 releases
    return (
        <>
            {cards.map(card => (
                <div onClick={(e) => {
                    e.currentTarget.style.border == '' ?
                        e.currentTarget.style.border = '2px solid red':
                    e.currentTarget.style.border = ''
                }}
                key={card.card_name}
                className="card">
                    <img alt={card.card_name}
                    src={getCardImage(card.card_name)}
                     onError={(e) => {
                        e.currentTarget.src = "/spire_assets/cards/missing.jpg"
                    }}/>
                </div>
            ))}
        </>
    );
}


function getCardImage(cardName: string) {
    const fileName = cardName
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .toLowerCase();

    return `spire_assets/cards/${fileName}.webp`;
}