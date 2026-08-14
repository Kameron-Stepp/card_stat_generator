import CharacterCard from './CharacterCard'
import './Header.css'
import type { Character } from './helpers/typing'


type HeaderProps = {
    characters: Character[],
    setSelectedCard: React.Dispatch<React.SetStateAction<string>>,
    setSelectedCharacter: React.Dispatch<React.SetStateAction<Character>>
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function Header({characters, setSelectedCharacter, setSelectedCard, setSearch}: HeaderProps) {

    return (
        <>
            <img src='spire_assets/background/logo.webp'/>
            <div id='characters'>
                {characters.map((character: Character, index: number) => (
                    <CharacterCard key={index} character={character} selectCharacter={setSelectedCharacter} setSelectedCard={setSelectedCard} setSearch={setSearch}/>
                ))}
            </div>
        </>
    )
}