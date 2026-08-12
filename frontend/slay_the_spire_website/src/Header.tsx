import CharacterCard from './character_card'
import ironclad_img from './assets/spire_assets/background/char_select_ironclad.webp'
import silent_img from './assets/spire_assets/background/char_select_silent.webp'
import defect_img from './assets/spire_assets/background/char_select_defect.webp'
import regent_img from './assets/spire_assets/background/char_select_regent.webp'
import necrobinder_img from './assets/spire_assets/background/char_select_necrobinder.webp'
import logo from './assets/spire_assets/background/logo.webp'
import './Header.css'

 const characters = [
    {name: "Ironclad", src: ironclad_img, color: 'red'},
    {name: "Silent", src: silent_img, color: 'green'},
    {name: "Defect", src: defect_img, color: 'blue'},
    {name: "Regent", src: regent_img, color: 'orange'},
    {name: "Necrobinder", src: necrobinder_img, color: 'purple'}
  ]

export default function Header() {
    return (
        <div className='spireHeader'>
            <img src={logo}/>
            <div className='characters'>
                {characters.map(character => (
                    <CharacterCard character={character}/>
                ))}
            </div>
        </div>
    )
}