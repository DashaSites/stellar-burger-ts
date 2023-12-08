import React, { useState } from "react";
import styles from "./reset-password.module.css";
import {
  Input,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//import { resetPassword } from "../../utils/burger-api.js";


export const ResetPasswordPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();



  return (
    <div className={styles.formContainer}>
      <form className={styles.form} > {/* ADD HERE */}  
        <h2 className={`${styles.headline} text text_type_main-medium mb-6`}>Восстановление пароля</h2> 
        <fieldset className={styles.inputItems}>   
         <PasswordInput 
          placeholder="Введите новый пароль"
          value="will add later"
          onChange={() => {console.log("will add later")}}
          required 
         />
         <Input 
          placeholder="Введите код из письма"
          value="will add later"
          onChange={() => {console.log("will add later")}}
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
        <button className={`${styles.navigationButton} text text_type_main-default`} > {/* ADD HERE */} 
          Войти
        </button>
      </div>
    </div>
  )
}