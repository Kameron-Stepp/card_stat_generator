import { useState } from 'react'
import CharacterCard from './CharacterCard'
import './Header.css'
import { DISPLAY_OPTION, type Character } from './helpers/typing'


type HeaderProps = {
    characters: Character[],
    selectedCharacterName: string,
    setSelectedCard: React.Dispatch<React.SetStateAction<string>>,
    setSelectedCharacter: React.Dispatch<React.SetStateAction<Character>>
    setSearch: React.Dispatch<React.SetStateAction<string>>,
}

export default function Header({characters, selectedCharacterName, setSelectedCharacter, setSelectedCard, setSearch}: HeaderProps) {
    let text_color = 'white'
    const [displayOption, setDisplayOption] = useState<string>(DISPLAY_OPTION.GENERAL)

    return (
        <>
            <img src='spire_assets/background/logo.webp'/>
            <div id='characters'>
                {characters.map((character: Character, index: number) => (
                    <CharacterCard key={index} 
                    character={character}
                    isSelected={character.name === selectedCharacterName}
                    selectCharacter={setSelectedCharacter} 
                    setSelectedCard={setSelectedCard}
                    setSearch={setSearch}/>
                    
                ))}
            </div>
            <div id='display_options'>
                <h2 className={`display_option ${displayOption === DISPLAY_OPTION.GENERAL ? 'selected' : ''}`}
                 onClick={() => setDisplayOption(DISPLAY_OPTION.GENERAL)}
                 >General</h2>
                <h2 className={`display_option ${displayOption === DISPLAY_OPTION.ENEMIES ? 'selected' : ''}`}
                 onClick={() => setDisplayOption(DISPLAY_OPTION.ENEMIES)}
                 >Enemies</h2>
                 <h2 className={`display_option ${displayOption === DISPLAY_OPTION.CARD_DETAILS ? 'selected' : ''}`}
                 onClick={() => setDisplayOption(DISPLAY_OPTION.CARD_DETAILS)}
                 >Card Details</h2>
                 <h2 className={`display_option ${displayOption === DISPLAY_OPTION.RUN_DETAILS ? 'selected' : ''}`}
                 onClick={() => setDisplayOption(DISPLAY_OPTION.RUN_DETAILS)}
                 >Run Details</h2>
            </div>
        </>
    )
}