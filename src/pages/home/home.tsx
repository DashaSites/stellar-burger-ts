import React from "react";
import styles from "./home.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import { useSelector, useDispatch } from "../../services/store/store";
import { RootState } from "../../services/store/store";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

export const HomePage = (): JSX.Element => {

  const isUserAuthorized = useSelector(isUserAuthorizedSelector);

  // Достаю из стора ингредиенты, загруженные с сервера
  const { ingredients, isLoading, isError } = useSelector(
    (state: RootState) => state.ingredientsState
  );
    
  const dispatch = useDispatch();


  return (
    <div className={styles.home}>
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
} 