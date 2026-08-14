
import './CharacterCard.css'
import type { Character } from './helpers/typing'

type CharacterCardProps = {
  character: Character,
  setSelectedCard: React.Dispatch<React.SetStateAction<string>>,
  selectCharacter: React.Dispatch<React.SetStateAction<Character>>
  setSearch: React.Dispatch<React.SetStateAction<string>>
}
export default function CharacterCard ({character, selectCharacter, setSelectedCard, setSearch}: CharacterCardProps) {
    return (
    <button
      id="character"
      style={{ backgroundImage: `url(${character.src})`, borderColor: character.color}}
      onClick={() => {
        selectCharacter(character)
        setSelectedCard('')
        setSearch('')
    }}
    >
      {character.name}
    </button>
  )
}
