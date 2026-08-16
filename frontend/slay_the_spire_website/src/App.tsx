import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import RunHistory from './components/RunHistory'
import StatBlock from './components/StatBlock'
import Cards from './components/Cards'
import type {Character, Run, RunData} from './components/helpers/typing'
import { formatTime } from './components/helpers/formating'
import CardDetails from './components/CardDetails'

 const characters: Character[] = [
    {name: "Ironclad", src: '/spire_assets/background/char_select_ironclad.webp', color: '#c0392b'},
    {name: "Silent", src: '/spire_assets/background/char_select_silent.webp', color: '#2e9e63'},
    {name: "Defect", src: '/spire_assets/background/char_select_defect.webp', color: '#3f8fd9'},
    {name: "Regent", src: '/spire_assets/background/char_select_regent.webp', color: '#d98a2b'},
    {name: "Necrobinder", src: '/spire_assets/background/char_select_necrobinder.webp', color: '#9b3fc4'}
  ]

function App() {
  const [character, setCharacter] = useState(characters[0])
  const [selectedCard, setSelectedCard] = useState('')
  const [runs, setRuns] = useState<Run[]>([])
  const [stats, setStats] = useState<RunData>({wins: 0, losses: 0, avg_time: 0, runs:0})
  const [search, setSearch] = useState("")

  // Get the Data for Run Table and Top Stats bar
  useEffect(() => {
        fetch(`http://localhost:3000/${character.name}/runs`)
            .then(response => response.json())
            .then(data => {
                setRuns(data);
            })

        fetch(`http://localhost:3000/${character.name}/runs/stats`)
          .then(response => response.json())
          .then(data => {
              setStats(data)
          })
    }, [character]);

  return (
      <div id='wrapper' style={{ '--accent': character.color } as React.CSSProperties}>
        <div id='header'>
          <Header characters={characters} selectedCharacterName={character.name} setSelectedCharacter={setCharacter} setSelectedCard={setSelectedCard} setSearch={setSearch}/>
        </div>
        <div id='center'>
          <div id='top'>
            <h2>{character.name.toUpperCase()}</h2>
          </div>
          {statBlocks(stats)}
          <div className={`center-section ${selectedCard === '' ? '' : 'selected'}` }>
            <div id='history'>
              <RunHistory runs={runs}/>
            </div>
            <div id='card_section'>
              <h2>Search<input id='card_search' type='search' value={search} onChange={(e) => setSearch(e.target.value)}></input></h2>
              <div id='cards'>
              <Cards search={search} selectedCharacter={character.name} setSelectedCard={setSelectedCard} selectedCard={selectedCard}/>
            </div>
          </div>
        </div>
        <div className={`card_details ${selectedCard === '' ? '' : 'selected'}`}>
          <CardDetails selectedCard={selectedCard}></CardDetails>
        </div>
      </div>
    </div>
  )
}
// This function will be changed when given actual data via a map function
function statBlocks(stats: RunData) {
  const win_percent = stats.runs > 0
    ? `${((stats.wins / stats.runs) * 100).toFixed(1)}%`
    : "0%";

  const losses = stats.runs - stats.wins;

  const loss_percent = stats.runs > 0
    ? `${((losses / stats.runs) * 100).toFixed(1)}%`
    : "0%";


  return (
    <div id='stat-blocks'>
      <StatBlock data={{type: "Runs", number: String(stats.runs), percentage: ''}} ></StatBlock>
      <StatBlock data={{type: "Wins", number: String(stats.wins), percentage: win_percent }}></StatBlock>
      <StatBlock data={{type: "Losses", number: String(losses), percentage: loss_percent}}></StatBlock>
      <StatBlock data={{type: "Avg Time", number: formatTime(stats.avg_time), percentage: ''}}></StatBlock>
    </div>
  )
}
export default App
