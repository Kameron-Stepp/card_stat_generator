import CharacterCard from './character_card'
import './Header.css'

import logo from '../assets/spire_assets/background/logo.webp'


export default function Header({characters}) {
    return (
        <>
            <img src={logo}/>
            <div id='characters'>
                {characters.map(character => (
                    <CharacterCard character={character}/>
                ))}
            </div>
        </>
    )
}