import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Rules from './pages/rules/RulesPage'
import Main from './pages/main/ui/Main'
import CardStack from './widgets/card-stack/ui/CardStack'
import MyQuestionnaire from './features/edit-profile/ui/MyQuestionnaire'
import Likes from './pages/likes/LikesPage'
import Matches from './pages/matches/MatchesPage'


function App() {
  const [myCardSettings, setMyCardSettings] = useState({})

  const myQuestionnaire = {name : 'Даня', age : 19, city : 'Москва', gender : "Парень", id : Date.now()}

  function myCard(properties : any){
    setMyCardSettings(properties)
  }
  useEffect (() => {
    myCard(myQuestionnaire)
  }, [])

  const accountList : any = []

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/authorization" element={<Rules myCard = {myCard}/>} />
        <Route path='/flow' element={<CardStack accountList = {accountList} onPage={'flow'}/>} />
        <Route path='/myquestionnaire' element={<MyQuestionnaire myCardSettings = {myCardSettings} myCard = {myCard}/>} />
        <Route path="/likes" element={<Likes/>} />
        <Route path="/matches" element={<Matches/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
