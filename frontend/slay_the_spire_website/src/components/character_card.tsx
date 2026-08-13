
import './character_card.css'


export default function CharacterCard ({character}) {
    return (
    <button
      id="character"
      style={{ backgroundImage: `url(${character.src})`, borderColor: character.color}}
      onClick={reroute}
    >
      {character.name}
    </button>
  )

    function reroute() {
        alert(character.name)
    }
}
