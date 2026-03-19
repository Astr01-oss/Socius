import { useState } from 'react'
import './MyQuestionnaire.css'
import { useNavigate } from 'react-router';

function CreateQusetionnaire({myCard}){

  const navigate = useNavigate()
  const flow = () => {
    navigate('/flow');
  };

  const [gender, setGender] = useState('')
  const [flowGender, setFlowGender] = useState('')
  
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [city, setcCity] = useState('')


  function chooseGender(e, genderInput : string){
    e.preventDefault()
    if (genderInput === 'Парень'){
      setGender('Парень')
    }
    if (genderInput === 'Девушка'){
      setGender('Девушка')
    }
  }
  function chooseFlowGender(e, genderInput : string){
    e.preventDefault()
    if (genderInput === 'Парень'){
      setFlowGender('Парень')
    }
    if (genderInput === 'Девушка'){
      setFlowGender('Девушка')
    }
    if (genderInput === 'Всех'){
      setFlowGender('Всех')
    }
  }
  function ageInput(e){
    setAge(e.target.value.replace(/[^0-9]/g, ''))
  }
  function cityInput(e){
    setcCity(e.target.value.replace(/[^а-яА-ЯёЁ]/g, ''))
  }
  function goToFlow(e){
    e.preventDefault()
    if(gender && flowGender && age && name && city){    
      const myQuestionnaire = {name : name, age : age, city : city, gender : gender, id : Date.now()}
      myCard(myQuestionnaire)
      flow()
    }
  }
  return(
    <div className="container">
      <div className="create_questionnaire">
        <h1>Регистрация анкеты</h1>
        <div className="create_questionnaire_form">
          <form>
            <p>Имя</p>
            <input type="text" placeholder='Как к вам обращаться?' onChange={e => (setName(e.target.value))}/>
            <p>Возраст</p>
            <input type="text" placeholder='Сколько вам полных лет?' value={age} onChange={ageInput}/>
            <p>Город</p>
            <input type="text" placeholder='Укажите ваш город' value={city} onChange={cityInput}/>
            <p>Пол</p>
            <div className="button_cont">
              <button className={(gender == 'Парень'? 'active' : '') +' form_button'} onClick={e => (chooseGender(e, 'Парень'))}>Парень</button>
              <button className={(gender == 'Девушка'? 'active' : '') +' form_button'} onClick={e => (chooseGender(e, 'Девушка'))}>Девушка</button>
            </div>
            <p>Кого показывать?</p>
            <div className="button_cont">
              <button className={(flowGender == 'Парень'? 'active' : '') +' form_button'} onClick={e => (chooseFlowGender(e, 'Парень'))}>Парней</button>
              <button className={(flowGender == 'Девушка'? 'active' : '') +' form_button'} onClick={e => (chooseFlowGender(e, 'Девушка'))}>Девушек</button>
              <button className={(flowGender == 'Всех'? 'active' : '') +' form_button'} onClick={e => (chooseFlowGender(e, 'Всех'))}>Всех</button>
            </div>
            <button id='go_to_flow' onClick={goToFlow}>Перейти в ленту</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateQusetionnaire