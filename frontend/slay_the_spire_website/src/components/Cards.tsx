import { useEffect, useState } from "react";
import './Cards.css'
import { file_format } from "./helpers/formating";


type Card = {
    card_name: string;
};

type CardsProps = {
    selectedCharacter: string;
    setSelectedCard: React.Dispatch<React.SetStateAction<string>>;
    selectedCard: string,
    search: string
};

export default function Cards({ selectedCharacter, setSelectedCard, selectedCard, search}: CardsProps) {
    
    
    const [cards, setCards] = useState<Card[]>([]);
    useEffect(() => {
        fetch(`http://localhost:3000/${selectedCharacter}/cards`)
            .then(response => response.json())
            .then(data => {
                setCards(data);
            });
    }, [selectedCharacter]);

    const filtered_cards = cards.filter(card => {
    const cardName = card.card_name
        .toLowerCase()
        .replace(/\s/g, '');

    const searchValue = search
        .toLowerCase()
        .replace(/\s/g, '');

    return cardName.includes(searchValue);
});

    // There will be images missing since the game updats and changes cards. should be solid once 1.0 releases
    return (
        <>
            {filtered_cards.map(card => (
                <div onClick={() => {
                    selectedCard === card.card_name ? setSelectedCard('') : setSelectedCard(card.card_name)
                }}
                key={card.card_name}
                className={`card ${selectedCard=== card.card_name ? "selected": ""}`}>
                    <img alt={card.card_name}
                    src={file_format(card.card_name)}
                     onError={(e) => {
                        e.currentTarget.src = "/spire_assets/cards/missing.jpg"
                    }}/>
                </div>
            ))}
        </>
    );
}

