import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import RunHistory from './components/RunHistory'

import ironclad_img from './assets/spire_assets/background/char_select_ironclad.webp'
import silent_img from './assets/spire_assets/background/char_select_silent.webp'
import defect_img from './assets/spire_assets/background/char_select_defect.webp'
import regent_img from './assets/spire_assets/background/char_select_regent.webp'
import necrobinder_img from './assets/spire_assets/background/char_select_necrobinder.webp'
import StatBlock from './components/StatBlock'
import Cards from './components/Cards'


 const characters = [
    {name: "Ironclad", src: ironclad_img, color: 'red'},
    {name: "Silent", src: silent_img, color: 'green'},
    {name: "Defect", src: defect_img, color: 'blue'},
    {name: "Regent", src: regent_img, color: 'orange'},
    {name: "Necrobinder", src: necrobinder_img, color: '#470047'}
  ]

function App() {
  const [character, setCharacter] = useState(characters[0])
  return (
      <div id='wrapper'>
        <div id='header'>
          <Header characters={characters}/>
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
            <div id='cards'>
              <Cards/>
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
    </div>
  )
}
export default App
