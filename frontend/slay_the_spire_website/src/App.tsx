import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import RunHistory from './components/RunHistory'
import StatBlock from './components/StatBlock'
import Cards from './components/Cards'


 const characters = [
    {name: "Ironclad", src: '/spire_assets/background/char_select_ironclad.webp', color: 'red'},
    {name: "Silent", src: '/spire_assets/background/char_select_silent.webp', color: 'green'},
    {name: "Defect", src: '/spire_assets/background/char_select_defect.webp', color: 'blue'},
    {name: "Regent", src: '/spire_assets/background/char_select_regent.webp', color: 'orange'},
    {name: "Necrobinder", src: '/spire_assets/background/char_select_necrobinder.webp', color: '#470047'}
  ]

function App() {
  const [character, setCharacter] = useState(characters[0])

  return (
      <div id='wrapper'>
        <div id='header'>
          <Header characters={characters} setSelectedCharacter={setCharacter}/>
        </div>
        <div id='center'>
          <div id='top'>
            <h2>{character.name.toUpperCase()}</h2>
            <p>Detailed Statistics for {character.name}</p>
          </div>
          {statBlocks(null)}
          <div id='center-section'>
            <div id='history'>
              <RunHistory/>
            </div>
            <div id='card_section'>
              <h2>Search<input id='card_search' type='search'></input></h2>
              <div id='cards'>
              <Cards selectedCharacter={character.name}/>
            </div>
            </div>
          </div>
          <div id='card-details'>

          </div>
        </div>
      </div>

  
  )
}
// This function will be changed when given actual data via a map function
function statBlocks(data) {
  return (
    <div id='stat-blocks'>
      <StatBlock data={{type: 'Runs', number: 76, percentage: null }}></StatBlock>
      <StatBlock data={{type: 'Wins', number: 32, percentage: '40.64%'}}></StatBlock>
      <StatBlock data={{type: 'Wins', number: 32, percentage: '40.64%'}}></StatBlock>
    </div>
  )
}
export default App
