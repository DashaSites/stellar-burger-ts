import { ConstructorIngredientWithKey, Ingredient } from "../../utils/burger-api-types.js";
import { RootState } from "../store/store.js";
import { ingredientSelector } from "./ingredientsSelectors.js";

// Элемент булки, найденный через редьюсер для конструктора бургера
export function bunSelector(state: RootState) {
  const bunID = state.constructorState.bunIngredientID;
  return state.ingredientsState.ingredients.find((item) => item._id === bunID);
}

// Элемент начинки, найденный через редьюсер для конструктора бургера
export function middleIngredientsSelector(state: RootState) {
  const middleIngredientsKeysAndIds = state.constructorState.middleIngredients;

  const middleIngredients: ConstructorIngredientWithKey[] = [];

  middleIngredientsKeysAndIds.forEach((middleIngredientKeyAndId) => {
    const ingredient = ingredientSelector(middleIngredientKeyAndId.id)(state);

    if (!ingredient) {
      return;
    }

    const ingredientWithKey = {
      ...ingredient,
      key: middleIngredientKeyAndId.key,
    };

    middleIngredients.push(ingredientWithKey);


  });

  return middleIngredients;
}