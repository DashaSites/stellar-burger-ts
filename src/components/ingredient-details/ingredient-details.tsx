import React from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
import { ingredientSelector } from "../../services/selector/ingredientsSelectors";
import { useParams } from 'react-router-dom';


const IngredientDetails = (): React.JSX.Element => {

  const { ingredientId } = useParams();

  // КЛИКНУТЫЙ ИНГРЕДИЕНТ
  const ingredient = useSelector(ingredientSelector(ingredientId!)); 


  return (
    <article className={ingredientDetailsStyles.container}>
      <h2
        className={`${ingredientDetailsStyles.heading} text text_type_main-large`}
      >
        Детали ингредиента
      </h2>
      <img
        className={`${ingredientDetailsStyles.image} mb-4`}
        src={ingredient.image}
      />
      <h3
        className={`${ingredientDetailsStyles.title} text text_type_main-medium mb-8`}
      >
        {ingredient.name}
      </h3>
      <div className={ingredientDetailsStyles.description}>
        <div className={ingredientDetailsStyles.quality}>
          <p
            className={`${ingredientDetailsStyles.measurementUnit} text text_type_main-default`}
          >
            Калории,ккал
          </p>
          <p
            className={`${ingredientDetailsStyles.amount} text text_type_digits-default`}
          >
            {ingredient.calories}
          </p>
        </div>
        <div className={ingredientDetailsStyles.quality}>
          <p
            className={`${ingredientDetailsStyles.measurementUnit} text text_type_main-default`}
          >
            Белки, г
          </p>
          <p
            className={`${ingredientDetailsStyles.amount} text text_type_digits-default`}
          >
            {ingredient.proteins}
          </p>
        </div>
        <div className={ingredientDetailsStyles.quality}>
          <p
            className={`${ingredientDetailsStyles.measurementUnit} text text_type_main-default`}
          >
            Жиры, г
          </p>
          <p
            className={`${ingredientDetailsStyles.amount} text text_type_digits-default`}
          >
            {ingredient.fat}
          </p>
        </div>
        <div className={ingredientDetailsStyles.quality}>
          <p
            className={`${ingredientDetailsStyles.measurementUnit} text text_type_main-default`}
          >
            Углеводы, г
          </p>
          <p
            className={`${ingredientDetailsStyles.amount} text text_type_digits-default`}
          >
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </article>
  );
};

export default IngredientDetails;