import React from "react";
import styles from "./home.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import { useSelector, useDispatch } from "react-redux";

export const HomePage = () => {

  // const isUserAuthorized = useSelector(isUserAuthorizedSelector);

  // Достаю из стора ингредиенты, загруженные с сервера
  const { ingredients, isLoading, isError } = useSelector(
    (state: any) => state.ingredientsState
  );
    
  const dispatch = useDispatch();


  return (
    <div className={styles.home}>
      <main className={styles.main}>
        <BurgerIngredients />
        {/* <BurgerConstructor /> */}
      </main>
    </div>
  );
} 