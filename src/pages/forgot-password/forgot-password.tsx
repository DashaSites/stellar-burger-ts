import React, { useState } from "react";
import styles from "./forgotPassword.module.css";
import {
  EmailInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../services/store/store";
import { recognizeUser } from "../../utils/burger-api";


export const ForgotPasswordPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState("");

  const loginButtonClickHandler = () => {
    navigate("/login");
  }

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  }

  const handleForgotPassFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    forgotPasswordServerRequest();

    setEmailValue("");
  }

  const forgotPasswordServerRequest = () => {
    recognizeUser(emailValue)
    .then((res) => {
      console.log(res.message);
      localStorage.setItem("flagToResetPassword", "flagToResetPassword");
      navigate("/reset-password", { replace: true });
    }).catch((err) => {
        console.log(err);
    })
  }


  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleForgotPassFormSubmit}>
        
        <h2 className={`${styles.headline} text text_type_main-medium mb-6`}>Восстановление пароля</h2>
        
        <EmailInput 
          placeholder="Укажите e-mail"
          onChange={onEmailChange}
          value={emailValue}
          required
        />

        <div className={`${styles.restoreButton} mt-6 mb-20`}>
          <Button htmlType="submit">Восстановить</Button>
        </div>
      
      </form>

      <div className={`${styles.navigationContainer} mb-4`}>

        <p className={`${styles.navigationText} text text_type_main-default`}>
          Вспомнили пароль?
        </p>

        <button className={`${styles.navigationButton} text text_type_main-default`} onClick={loginButtonClickHandler}>
          Войти
        </button>

      </div>

    </div>
  )
}

export default ForgotPasswordPage;