import { useState } from 'react';
import './RulesAndAuthorization.css'
import Authorization from './Authorization';

function Rules({myCard}){
  const [AuthorizationPage, setAuthorizationPage] = useState('')
  const authorization = () => {
    setAuthorizationPage('Auth')
  };
  function rules(){
    return(
      <div className="container">
        <div className="rules">
          <h1>Правила</h1>
          <ul>
            <li>Запрещено расспростронение <strong>личной информации</strong> кого либо.</li>
            <li>Используйте <strong>своё имя</strong> или короткой никнейм без оскорбительных слов и выражений. </li>
          </ul>
          <span>В противном случае анкета будет <strong>заблокирована</strong>, а вы не сможете пересоздать новую со своего Telegram и телефона.</span>
          <button onClick={authorization}>Я понял(а)</button>
        </div>
      </div>
    )
  }
  return(
    AuthorizationPage === 'Auth'?
    <Authorization myCard = {myCard}/>
    :
    rules()
  )
}

export default Rules