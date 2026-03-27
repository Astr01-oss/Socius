import { useEffect, useState } from 'react';
import './Authorization.css';
import CreateQusetionnaire from '../../edit-profile/ui/CreateQuestionnaire';
import { authAPI } from '../../../shared/api/auth';
import { cardApi } from '../../../shared/api/card';
import { useNavigate } from 'react-router';
import { useTelegram } from '../../../shared/api/telegram';

function Authorization({ myCard }) {
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [rPassword, setRPassword] = useState('');

  const [loginValid, setLoginValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [rPasswordValid, setRPasswordValid] = useState(true);

  const [accountAvailability, setAccountAvailability] = useState(false);
  const [ToQusetionnaire, setToQusetionnaire] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const { initData } = useTelegram();

  function checkInput(value, type, setInputName, setInputValidName) {
    setInputName(value);
    if (type === 'login') {
      const isValid =
        value[0] === '+' ? value.length === 12 : value.length === 11;
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
    } else {
      setRPasswordValid(false);
    }
  }, [password, rPassword]);

  const handleSuccessfulAuth = async (userId: number) => {
    try {
      const questionnaire = await cardApi.myCard();
      if (questionnaire && Object.keys(questionnaire).length > 0) {
        navigate('/flow');
      } else {
        setUserId(userId);
        setToQusetionnaire(true);
      }
    } catch (error: any) {
      if (error.message === 'Анкета не заполнена') {
        setUserId(userId);
        setToQusetionnaire(true);
      } else {
        console.error('Ошибка проверки анкеты:', error);
        setUserId(userId);
        setToQusetionnaire(true);
      }
    }
  };

  async function registration(e) {
    e.preventDefault();
    if (login && password) {
      if (loginValid && passwordValid && rPasswordValid) {
        try {
          const response = await authAPI.register(login, password);
          if (!response.success) {
            throw new Error(response.error || 'Ошибка регистрации');
          }
          const loginResponse = await authAPI.login(login, password);
          if (loginResponse.success) {
            await handleSuccessfulAuth(loginResponse.user.id);
          } else {
            console.error('Ошибка автоматического входа');
          }
        } catch (err: any) {
          console.log(`error ${err}`);
        }
      }
    }
  }

  async function logIn(e) {
    e.preventDefault();
    try {
      const response = await authAPI.login(login, password);
      if (!response.success) {
        throw new Error(response.error || 'Ошибка входа');
      }
      await handleSuccessfulAuth(response.user.id);
    } catch (err: any) {
      console.log(`error ${err}`);
    }
  }

  function goRegistration() {
    setAccountAvailability(false);
  }

  function registrationForm() {
    return (
      <form>
        <input
          type="email"
          placeholder="Номер телефона"
          className={(loginValid ? '' : 'inValid') + ' register_input'}
          onChange={(e) =>
            checkInput(e.target.value, 'login', setLogin, setLoginValid)
          }
        />
        <input
          type="password"
          placeholder="Пароль"
          className={(passwordValid ? '' : 'inValid') + ' register_input'}
          onChange={(e) =>
            checkInput(e.target.value, 'password', setPassword, setPasswordValid)
          }
        />
        <input
          type="password"
          placeholder="Повторить пароль"
          className={(rPasswordValid ? '' : 'inValid') + ' register_input'}
          onChange={(e) =>
            checkInput(e.target.value, 'rpassword', setRPassword, setRPasswordValid)
          }
        />
        <button onClick={registration}>Регистрация</button>
        <a className="accountTitle" onClick={() => setAccountAvailability(true)}>
          У меня есть аккаунт
        </a>
      </form>
    );
  }

  function loginForm() {
    return (
      <form action="login">
        <input
          type="email"
          placeholder="Номер телефона"
          className={(loginValid ? '' : 'inValid') + ' register_input'}
          onChange={(e) =>
            checkInput(e.target.value, 'login', setLogin, setLoginValid)
          }
        />
        <input
          type="password"
          placeholder="Пароль"
          className={(passwordValid ? '' : 'inValid') + ' register_input'}
          onChange={(e) =>
            checkInput(e.target.value, 'password', setPassword, setPasswordValid)
          }
        />
        <button type="submit" onClick={logIn}>
          Вход
        </button>
        <a className="accountTitle" onClick={goRegistration}>
          У меня нету аккаунта
        </a>
      </form>
    );
  }

  const handleTelegramLogin = async () => {
    if (!initData) {
      alert('Telegram не обнаружен. Откройте приложение через Telegram.');
      return;
    }
    try {
      const response = await authAPI.telegramLogin(initData);
      if (!response.success) {
        throw new Error(response.error || 'Ошибка входа через Telegram');
      }
      await handleSuccessfulAuth(response.user.id);
    } catch (err: any) {
      console.error('Telegram login error:', err);
      alert(err.message);
    }
  };

  function auth() {
    return (
      <div className="container">
        <div className="authorization">
          <button onClick={handleTelegramLogin}>Войти с Telegram</button>
          <p>Войти вручную</p>
          {accountAvailability ? loginForm() : registrationForm()}
        </div>
      </div>
    );
  }

  return ToQusetionnaire ? (
    <CreateQusetionnaire
      myCard={myCard}
      onSuccess={() => {
        navigate('/flow');
      }}
    />
  ) : (
    auth()
  );
}

export default Authorization;