import NavPanel from "../NavPanel"
import Card from '../Card/Card'
import './Flow.css'
import { useEffect, useState } from "react"

function Flow({accountList, onPage}){
  const [accountNumber, setAccountNumber] = useState(0)

  function like(){
    setAccountNumber(accountNumber + 1)
  }
  function disslike(){
    setAccountNumber(accountNumber + 1)
  }
  function nullCard(){
    return (
    <h1 className="nullCard">Анкеты закончились</h1>

    )
  }

  useEffect(() => {
    
  }, [])
  return(
    <div className="container">
      <div className="content_container">
        {
          onPage === 'flow'?
          <Card like = {like} disslike = {disslike} accountList = {accountList.length === accountNumber? setAccountNumber(0) : accountList[accountNumber]}/>
          :
          accountList.length === accountNumber? nullCard() : <Card like = {like} disslike = {disslike} accountList = {accountList[accountNumber]}/>
        }
        <NavPanel onPage={onPage === 'flow'? 'flow' : ''}/>
      </div>
    </div>
  )
}

export default Flow