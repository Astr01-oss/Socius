import './Card.css'
import emptyavatar from '../icons/emptyavatar.jpg'
import Characteristics from './Characteristics'

function Card({accountList, like, disslike}){
  
  const avatar = ''

  function likeCard(){
    like()
  }
    function disslikeCard(){
    disslike()
  }
  return(
    <div className="card">
      <p>{accountList.name}</p>
      <img src={avatar? avatar : emptyavatar} alt="" className='avatar'/>
      <Characteristics characteristics = {accountList}/>
      <div className="button_panel">
        <div className="button_overlay" onClick={likeCard}><button id="like"></button></div>
        <div className="button_overlay" onClick={disslikeCard}><button id="skip"></button></div>
      </div>
    </div>
  )
}

export default Card