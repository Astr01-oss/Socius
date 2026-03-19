import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Rules from './components/RulesAndAuthorization/Rules'
import Main from './components/Main'
import Flow from './components/Flow/Flow'
import MyQuestionnaire from './components/MyQuestionnaire/MyQuestionnaire'
import Likes from './components/Likes'
import Matches from './components/Matches'


function App() {

  const [authorized, setAuthorized] = useState(false)
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
        <Route path='/flow' element={<Flow accountList = {accountList} onPage={'flow'}/>} />
        <Route path='/myquestionnaire' element={<MyQuestionnaire myCardSettings = {myCardSettings} myCard = {myCard}/>} />
        <Route path="/likes" element={<Likes/>} />
        <Route path="/matches" element={<Matches/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
