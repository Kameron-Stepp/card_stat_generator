
import './character_card.css'


export default function CharacterCard ({character, selectCharacter}) {
    return (
    <button
      id="character"
      style={{ backgroundImage: `url(${character.src})`, borderColor: character.color}}
      onClick={() => {
        selectCharacter(character)
    }}
    >
      {character.name}
    </button>
  )
}
