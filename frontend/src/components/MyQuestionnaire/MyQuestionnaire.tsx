import { useState } from "react"
import Characteristics from "../Card/Characteristics"
import emptyavatar from "../icons/emptyavatar.jpg"
import CreateQusetionnaire from "./CreateQuestionnaire"
import NavPanel from "../NavPanel"

function MyQuestionnaire({myCardSettings, myCard}){
  const avatar = ''
  const [redact, goToReadact] = useState(false)

  function myCardInfo(){
    return(
      <div className="container">
        <div className="content_container">
          <div className="card">
            <p>{myCardSettings.name}</p>
            <img src={avatar? avatar : emptyavatar} alt="" className='avatar'/>
            <Characteristics characteristics = {myCardSettings}/>
            <button id="redact" onClick={goToReadact}>Редактировать анкету</button>
          </div>
          <NavPanel onPage={'questionnaire'}/>
        </div>
      </div>
    )
  }
  return(
    <>
      {redact? 
      <CreateQusetionnaire myCard={myCard}/> : myCardInfo()}
    </>
  )
}
export default MyQuestionnaire