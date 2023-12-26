import React, { useState } from "react";
import styles from "./resetPassword.module.css";
import {
  Input,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../utils/burger-api";


export const ResetPasswordPage = (): React.JSX.Element => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordValue, setPasswordValue] = useState("");
  const [codeValue, setCodeValue] = useState("");

  const loginButtonClickHandler = () => {
    navigate("/login");
  }

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  }

  const onCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCodeValue(event.target.value);
  }

  const handleResetPassFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getResetPasswordRequest();

    setPasswordValue("");
    setCodeValue("");
  }

  const getResetPasswordRequest = () => {
    resetPassword(passwordValue, codeValue)
    .then((res) => {
      console.log(res.message);
      localStorage.removeItem("flagToResetPassword");
      navigate("/login", { replace: true });
    }).catch((err) => {
        console.log(err);
    })
  }

  const isPasswordToReset = localStorage.getItem("flagToResetPassword");

  if (!isPasswordToReset) {
    navigate("/", { replace: true });
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleResetPassFormSubmit}>  
        <h2 className={`${styles.headline} text text_type_main-medium mb-6`}>Восстановление пароля</h2> 
        <fieldset className={styles.inputItems}>   
         <PasswordInput 
          placeholder="Введите новый пароль"
          onChange={onPasswordChange}
          value={passwordValue}
          required 
         />
         <Input 
          placeholder="Введите код из письма"
          onChange={onCodeChange}
          value={codeValue} 
        />
        </fieldset>
        <div className={`${styles.savePasswordButton} mt-6 mb-20`}>
          <Button htmlType="submit">Сохранить</Button>
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