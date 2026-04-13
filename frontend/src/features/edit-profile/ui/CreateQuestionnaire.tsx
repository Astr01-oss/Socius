import { useState, useEffect } from 'react';
import './MyQuestionnaire.css';
import { useNavigate } from 'react-router';
import { cardApi } from '../../../shared/api/card';

function CreateQusetionnaire({ myCard, initialData, onSuccess }) {
  const navigate = useNavigate();
  const flow = () => {
    navigate('/flow');
  };

  const [gender, setGender] = useState(initialData?.gender || '');
  const [flowGender, setFlowGender] = useState(initialData?.showGender || '');
  const [name, setName] = useState(initialData?.name || '');
  const [age, setAge] = useState(initialData?.age?.toString() || '');
  const [city, setCity] = useState(initialData?.city || '');

  function chooseGender(e, genderInput: string) {
    e.preventDefault();
    setGender(genderInput);
  }

  function chooseFlowGender(e, genderInput: string) {
    e.preventDefault();
    setFlowGender(genderInput);
  }

  function ageInput(e) {
    setAge(e.target.value.replace(/[^0-9]/g, ''));
  }

  function cityInput(e) {
    setCity(e.target.value.replace(/[^а-яА-ЯёЁ]/g, ''));
  }

  async function goToFlow(e) {
    e.preventDefault();
    if (gender && flowGender && age && name && city) {
      const myQuestionnaire = {
        name: name,
        age: parseInt(age, 10),
        city: city,
        gender: gender,
        showGender: flowGender,
      };
      try {
        await cardApi.createCard(myQuestionnaire);
        if (myCard) myCard(myQuestionnaire);
        if (onSuccess) {
          onSuccess();
        } else {
          flow();
        }
      } catch (error) {
        console.error('Ошибка сохранения анкеты:', error);
      }
    }
  }

  return (
    <div className="container">
      <div className="create_questionnaire">
        <h1>Регистрация анкеты</h1>
        <div className="create_questionnaire_form">
          <form>
            <p>Имя</p>
            <input
              type="text"
              placeholder="Как к вам обращаться?"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p>Возраст</p>
            <input
              type="text"
              placeholder="Сколько вам полных лет?"
              value={age}
              onChange={ageInput}
            />
            <p>Город</p>
            <input
              type="text"
              placeholder="Укажите ваш город"
              value={city}
              onChange={cityInput}
            />
            <p>Пол</p>
            <div className="button_cont">
              <button
                className={(gender == 'Парень' ? 'active' : '') + ' form_button'}
                onClick={(e) => chooseGender(e, 'Парень')}
              >
                Парень
              </button>
              <button
                className={(gender == 'Девушка' ? 'active' : '') + ' form_button'}
                onClick={(e) => chooseGender(e, 'Девушка')}
              >
                Девушка
              </button>
            </div>
            <p>Кого показывать?</p>
            <div className="button_cont">
              <button
                className={(flowGender == 'Парень' ? 'active' : '') + ' form_button'}
                onClick={(e) => chooseFlowGender(e, 'Парень')}
              >
                Парней
              </button>
              <button
                className={(flowGender == 'Девушка' ? 'active' : '') + ' form_button'}
                onClick={(e) => chooseFlowGender(e, 'Девушка')}
              >
                Девушек
              </button>
              <button
                className={(flowGender == 'Всех' ? 'active' : '') + ' form_button'}
                onClick={(e) => chooseFlowGender(e, 'Всех')}
              >
                Всех
              </button>
            </div>
            <button id="go_to_flow" onClick={goToFlow}>
              Сохранить анкету
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateQusetionnaire;