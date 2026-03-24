import { useEffect, useState } from 'react'
import './Authorization.css'
import CreateQusetionnaire from '../../edit-profile/ui/CreateQuestionnaire'
import { authAPI } from '../../../shared/api/auth'

function Authorization({myCard}){

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [rPassword, setRPassword] = useState('')

  const [loginValid, setLoginValid] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const [rPasswordValid, setRPasswordValid] = useState(true)

  const [accountAvailability, setAccountAvailability] = useState(false)

  const [ToQusetionnaire, setToQusetionnaire] = useState(false)

  function checkInput(value, type, setInputName, setInputValidName) {
    setInputName(value); 
    
    if (type === 'login') {
        const isValid = value[0] === '+' 
            ? value.length === 12
            : value.length === 11
        setInputValidName(isValid);
    }
    if (type === 'password') {
        const isValid = value.length > 7 && value.length < 20;
        setInputValidName(isValid);
    }
  }

  useEffect(() => {
    if (rPassword) {
        const isValid = password === rPassword;
        setRPasswordValid(isValid);
    } 
    else {
        setRPasswordValid(false);
    }
    }, [password, rPassword]);

  async function registration(e){
    e.preventDefault()
    if (login && password){
      if(loginValid && passwordValid && rPasswordValid){
        try {
          const response = await authAPI.register(login , password)
          console.log(response)
          if (!response){throw new Error(`warn : ${response}`)}
          else setAccountAvailability(true)
        } catch (err : any){
          console.log(`error ${err}`)
        }
      }
    }
  }

  async function logIn(e){
    e.preventDefault()
    try {
          const response = await authAPI.login(login, password)
          if (!response){throw new Error(`warn : ${response}`)}
          else {
            setToQusetionnaire(true)
            console.log(`Вы успешно авторизовались по номеру : ${login}`)
          }
    } catch (err : any){
      console.log(`error ${err}`)
    }
  }
  
  function goRegistration(){
    setAccountAvailability(false)
  }
  function registrationForm(){
    return(
      <form>
        <input type="email" placeholder='Номер телефона' className={(loginValid ? '' : 'inValid') + ' register_input'} onChange={e => checkInput(e.target.value, 'login', setLogin, setLoginValid)}/>
        <input type="password" placeholder='Пароль' className={(passwordValid ? '' : 'inValid') + ' register_input'} onChange={e => checkInput(e.target.value, 'password', setPassword, setPasswordValid)}/>
        <input type="password" placeholder='Повторить пароль' className={(rPasswordValid ? '' : 'inValid') + ' register_input'} onChange={e => checkInput(e.target.value, 'rpassword', setRPassword, setRPasswordValid)}/>
        <button onClick={registration}>Регистрация</button>
        <a className='accountTitle' onClick={setAccountAvailability}>У меня есть аккаунт</a>
      </form>
    )
  }
  function loginForm(){
    return(
      <form action="login">
        <input type="email" placeholder='Номер телефона' className={(loginValid ? '' : 'inValid') + ' register_input'} onChange={e => checkInput(e.target.value, 'login', setLogin, setLoginValid)}/>
        <input type="password" placeholder='Пароль' className={(passwordValid ? '' : 'inValid') + ' register_input'} onChange={e => checkInput(e.target.value, 'password', setPassword, setPasswordValid)}/>
        <button type='submit' onClick={logIn}>Вход</button>
        <a className='accountTitle' onClick={goRegistration}>У меня нету аккаунта</a>
      </form>
    )
  }

  function auth(){
    return(
      <div className="container">
        <div className="authorization">
          <button >Войти с Telegram</button>
          <p>Войти вручную</p>
          {accountAvailability? loginForm() : registrationForm()}
        </div>
      </div>
    )
  }
  return(
    ToQusetionnaire?
    <CreateQusetionnaire myCard = {myCard}/>
    :
    auth()
  )
  
}
export default Authorization