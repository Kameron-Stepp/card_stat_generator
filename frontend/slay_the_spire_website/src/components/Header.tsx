import CharacterCard from './character_card'
import './Header.css'


export default function Header({characters, setSelectedCharacter}) {
    return (
        <>
            <img src='spire_assets/background/logo.webp'/>
            <div id='characters'>
                {characters.map(character => (
                    <CharacterCard character={character} selectCharacter={setSelectedCharacter}/>
                ))}
            </div>
        </>
    )
}