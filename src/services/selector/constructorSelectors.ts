import { RootState } from "../store/store.js";
import { ingredientSelector } from "./ingredientsSelectors.js";

// Элемент булки, найденный через редьюсер для конструктора бургера
export function bunSelector(state: RootState) {
  const bunID = state.constructorState.bunIngredientID;
  return state.ingredientsState.ingredients.find((item) => item._id === bunID);
}

// Элемент начинки, найденный через редьюсер для конструктора бургера
export function middleIngredientsSelector(state: RootState) {
  const middleIngredients = state.constructorState.middleIngredients;
  return middleIngredients.map((middleIngredient) => {
    const ingredient = ingredientSelector(middleIngredient.id)(state);
    return {
      ...ingredient,
      key: middleIngredient.key,
    };
  });
}