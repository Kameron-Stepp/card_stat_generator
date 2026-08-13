import { useEffect, useState } from "react";
import './Cards.css'


type Card = {
    card_name: string;
    deck_wins: number;
    deck_losses: number;
    times_picked: number;
    times_skipped: number;
};

type CardsProps = {
    selectedCharacter: string;
};

export default function Cards({ selectedCharacter }: CardsProps) {
    
    
    const [cards, setCards] = useState<Card[]>([]);
    useEffect(() => {
        fetch(`http://localhost:3000/${selectedCharacter}/cards`)
            .then(response => response.json())
            .then(data => {
                setCards(data);
                console.log(data)
            });
    }, [selectedCharacter]);

    // There will be images missing since the game updats and changes cards. should be solid once 1.0 releases
    return (
        <>
            {cards.map(card => (
                <div onClick={() => {
                    alert(card.card_name)
                }}key={card.card_name} className="card">
                    <img alt={card.card_name} src={getCardImage(card.card_name)} onError={(e) => {
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