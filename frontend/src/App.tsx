import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Rules from './pages/rules/RulesPage'
import Main from './pages/main/ui/Main'
import CardStack from './widgets/card-stack/ui/CardStack'
import MyQuestionnaire from './features/edit-profile/ui/MyQuestionnaire'
import Likes from './pages/likes/LikesPage'
import Matches from './pages/matches/MatchesPage'
import { isAuthenticated } from './shared/api/auth'


function App() {

  const authorized = isAuthenticated()
  const [myCardSettings, setMyCardSettings] = useState({})

  const myQuestionnaire = {name : 'Даня', age : 19, city : 'Москва', gender : "Парень", id : Date.now()}

  function myCard(properties){
    setMyCardSettings(properties)
  }
  useEffect (() => {
    myCard(myQuestionnaire)
  }, [])

  const accountList = [ 
    {name : 'Даня', age : 19, city : 'Москва', games : ["Дота", "Валорант", "Кс"], id: 1},
    {name : 'Дима', age : 22, city : 'Москва', games : ["Майнкрафт", "Кс"], id: 1},
    {name : 'Витя', age : 16, city : 'Москва', games : ["Лол", "Валорант", "Кс"], id: 1},
    {name : 'Саша', age : 17, city : 'Москва', games : ["Дота", "Майнкрафт", "Кс"], id: 1},
    {name : 'Антон', age : 20, city : 'Москва', games : ["Фортнайт", "Валорант", "Кс"], id: 1},
  ]

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main authorized={authorized}/>} />
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
