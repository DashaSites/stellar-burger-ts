import React, { useState } from "react";
import loginStyles from "./login.module.css";
import {
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getFetchedAuthorizedUser } from "../../services/actions/authorizationActions";


// Страница авторизации
export const LoginPage = (): React.JSX.Element => { 

  // Пользователь вводит свои данные в форму
  // Сделать запрос (dispatch + action)
  // Запрос идет на сервер 
  // После этого данные пользователя (res) вместе с двумя токенами записываем в хранилище
  // (Оба токена записать в localStorage)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Если в стейте лежит простое значение типа строки, то его можно здесь не указывать.
  // А если внутри useState хранится какой-то объект, то лучше описать его тип.
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");


  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    dispatch(getFetchedAuthorizedUser(emailValue, passwordValue));

    setEmailValue("");
    setPasswordValue("");
  }

  const registerButtonClickHandler = () => {
    navigate("/register");
  }

  const restorePasswordButtonHandler =() => {
    navigate("/forgot-password");
  }


  return (
    <div className={loginStyles.formContainer}>
      <form className={loginStyles.form} onSubmit={handleFormSubmit}>

        <h2 className={`${loginStyles.headline} text text_type_main-medium mb-6`}>Вход</h2>
        <fieldset className={loginStyles.inputItems}>
         <EmailInput 
            onChange={onEmailChange}
            value={emailValue}
         />
         <PasswordInput 
          onChange={onPasswordChange}
          value={passwordValue}
         />
        </fieldset>

        <div className={`${loginStyles.loginButton} mt-6 mb-20`}>
          <Button htmlType="submit">Войти</Button>
        </div>      
      </form>

      <div className={`${loginStyles.navigationContainer} mb-4`}>

        <p className={`${loginStyles.navigationText} text text_type_main-default`}>
          Вы — новый пользователь?
        </p>

        <button className={`${loginStyles.navigationButton} text text_type_main-default`} onClick={registerButtonClickHandler}>
          Зарегистрироваться
        </button>

      </div>

      <div className={`${loginStyles.navigationContainer} mb-4`}>

        <p className={`${loginStyles.navigationText} text text_type_main-default`}>
          Забыли пароль?
        </p>

        <button className={`${loginStyles.navigationButton} text text_type_main-default`} onClick={restorePasswordButtonHandler}>
          Восстановить пароль
        </button>

      </div>
    </div>
  )
}

export default LoginPage;

