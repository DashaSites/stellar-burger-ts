import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useResolvedPath } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/store/store";
import { getFetchedUserDetails, getEditedUserDetails } from "../../services/actions/authorizationActions";
import { userNameSelector, userEmailSelector } from "../../services/selector/authorizationSelectors";
 

export const ProfilePage = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const match = useResolvedPath("").pathname; // получаю путь, который сейчас есть в адресной строке

  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const userName = useSelector(userNameSelector);
  const userEmail = useSelector(userEmailSelector);


  useEffect(() => {
    dispatch(getFetchedUserDetails());
  }, []);
  

  useEffect(() => {
    // Подгружаю из стора имя залогиненного пользователя в поле name 
    setNameValue(userName || "");
  }, [userName]);
  

  useEffect(() => {
    // Подгружаю из стора имейл залогиненного пользователя в поле email 
    setEmailValue(userEmail || "");
  }, [userEmail]);


  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  }

  const handleSaveChanges = () => {
    dispatch(getEditedUserDetails(nameValue, emailValue, passwordValue));
  }

  const handleReset = () => {
    setNameValue(userName || "");
    setEmailValue(userEmail || "");
    setPasswordValue("");
  }



  // Для условие - показать кнопки, когда что-то меняется в любом из инпутов
  const hasInputChanged = userName !== nameValue || userEmail !== emailValue || passwordValue
   


  return (
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSaveChanges}>        
          <fieldset className={styles.inputItems}>
           <Input 
              value={nameValue} 
              onChange={onNameChange} 
              placeholder="Имя" 
              icon={'EditIcon'}
            />
           <Input 
              value={emailValue} 
              onChange={onEmailChange} 
              placeholder="Логин" 
              icon={'EditIcon'}
           />
           <PasswordInput
              onChange={onPasswordChange}
              value={passwordValue}
              name={'password'}
          />
          </fieldset>
          {hasInputChanged ? (
            <div className={styles.buttonContainer}>
              <Button 
                htmlType="submit"
                type="primary" 
                size="medium"
                extraClass="ml-2"
              >  
                Сохранить
              </Button>
              <Button 
                htmlType="button" 
                type="primary" 
                size="medium" 
                extraClass="ml-2"
                onClick={handleReset}
              >
                Отмена
              </Button>
              </div>
            ) : null}
        </form>
      </div>
  )
}