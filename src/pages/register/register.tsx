import React, { useState } from "react";
import styles from "./register.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getFetchedRegisteredUser } from "../../services/actions/registrationActions";

export const RegisterPage = (): React.JSX.Element => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmailValue(e.target.value);
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPasswordValue(e.target.value);
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    dispatch(getFetchedRegisteredUser(nameValue, emailValue, passwordValue));

    setNameValue("");
    setEmailValue("");
    setPasswordValue("");
  }

  const loginButtonClickHandler = () => {
    navigate("/login");
  }


  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleFormSubmit}> 
        <h2 className={`${styles.headline} text text_type_main-medium mb-6`}>Регистрация</h2>   
        <fieldset className={styles.inputItems}>
         <Input 
            placeholder="Имя"
            onChange={onNameChange}
            value={nameValue}
         />
         <EmailInput 
            onChange={onEmailChange}
            value={emailValue}  
         />
         <PasswordInput       
            onChange={onPasswordChange}
            value={passwordValue}
         />
        </fieldset>
        <div className={`${styles.loginButton} mt-6 mb-20`}>
          <Button htmlType="submit">Зарегистрироваться</Button>
        </div>
      </form>

      <div className={`${styles.navigationContainer} mb-4`}>
        <p className={`${styles.navigationText} text text_type_main-default`}>
          Уже зарегистрированы?
        </p>
        <button className={`${styles.navigationButton} text text_type_main-default`} onClick={loginButtonClickHandler}>
          Войти
        </button>
      </div>
    </div>
  )
}

export default RegisterPage;
