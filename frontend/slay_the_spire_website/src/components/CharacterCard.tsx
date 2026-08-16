
import './CharacterCard.css'
import type { Character } from './helpers/typing'

type CharacterCardProps = {
  character: Character,
  isSelected: boolean,
  setSelectedCard: React.Dispatch<React.SetStateAction<string>>,
  selectCharacter: React.Dispatch<React.SetStateAction<Character>>
  setSearch: React.Dispatch<React.SetStateAction<string>>
}
export default function CharacterCard ({character, isSelected, selectCharacter, setSelectedCard, setSearch}: CharacterCardProps) {
    return (
    <button
      id="character"
      className={isSelected ? 'active' : ''}
      style={{
        backgroundImage: `url(${character.src})`,
        borderColor: character.color,
        boxShadow: isSelected ? `0 0 0 2px ${character.color}, 0 0 18px 2px ${character.color}` : undefined
      }}
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
