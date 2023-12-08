import React, { useState } from "react";
import styles from "./forgot-password.module.css";
import {
  EmailInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//import { recognizeUser } from "../../utils/burger-api.js";


export const ForgotPasswordPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();



  return (
    <div className={styles.formContainer}>
      <form className={styles.form} > 
        
        <h2 className={`${styles.headline} text text_type_main-medium mb-6`}>Восстановление пароля</h2>
        
        <EmailInput
          placeholder="Укажите e-mail"
          value="will add later"
          onChange={() => {console.log("will add later")}}
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

        <button className={`${styles.navigationButton} text text_type_main-default`} > {/* ADD HERE */}
          Войти
        </button>

      </div>

    </div>
  )
}

export default ForgotPasswordPage;