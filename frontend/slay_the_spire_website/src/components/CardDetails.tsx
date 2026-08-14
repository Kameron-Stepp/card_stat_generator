import { useEffect, useState } from "react";
import type { Card } from "./helpers/typing";
import './CharacterDetails.css'

type CardDetailsProps = {
    selectedCard: String;
}

export default function CardDetails({selectedCard}: CardDetailsProps) {
    const [cardData, setCardData] = useState<Card>({
        card_name: '',
        deck_losses: 0,
        deck_wins: 0,
        times_picked: 0,
        times_skipped: 0})

    useEffect(() => {
        if (selectedCard === '') {
            return
        }

        fetch(`http://localhost:3000/${selectedCard}`)
        .then((res) => res.json())
        .then(data => setCardData(data))
    }, [selectedCard])
        
    const total = cardData.deck_losses + cardData.deck_wins
    const total_cards_seen  = cardData.times_picked + cardData.times_skipped
    const win_percent = total > 0 ?  `${((cardData.deck_wins / total) * 100).toFixed(1)}%` : '0%'
    const loss_percent = total > 0 ?  `${((cardData.deck_losses / total) * 100).toFixed(1)}%` : '0%'
    const picked_percent = total_cards_seen > 0 ?  `${((cardData.times_picked / total_cards_seen) * 100).toFixed(1)}%` : '0%'
    const skipped_percent = total_cards_seen > 0 ?  `${((cardData.times_skipped / total_cards_seen) * 100).toFixed(1)}%` : '0%'

    return(
        <>
            <h1>{selectedCard}</h1>
            <div id='data'>
                <h3>Card Wins: {cardData.deck_wins} <div className="percent">{win_percent}</div></h3>
                <h3>Card Losses: {cardData.deck_losses} <div className="percent">{loss_percent}</div></h3>
                <h3>Times Card Picked: {cardData.times_picked}<div className="percent">{picked_percent}</div></h3>
                <h3>Times Card Skipped: {cardData.times_skipped}<div className="percent">{skipped_percent}</div></h3>
            </div>
        </>
    )
}