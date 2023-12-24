import { Ingredient } from "../../utils/burger-api-types";
import { RootState } from "../store/store";

// Элемент ингредиента, найденный по id через constructorReducer
export function ingredientSelector(id: string) {
  return function (state: RootState) {
    const allIngredients = state.ingredientsState.ingredients;

    const ingredient = allIngredients.find((element) => element._id === id);

    return ingredient;
  };
}


// Общая цена заказа, найденная по id всех его ингредиентов
export function orderPriceSelector(ingredientsIds: string[]) {

  return function (state: RootState) {
    const allIngredients = state.ingredientsState.ingredients;

    const selectedIngredients = ingredientsIds.map((id) => {
      return allIngredients.find((ingredient) => ingredient._id === id)
    })

    const selectedIngredientsDefined = selectedIngredients.filter(item => !!item) as Ingredient[];



    const getOrderPrice = (ingredientsInOrder: Ingredient[]) => {
      let orderPrice = 0;
   
      ingredientsInOrder.forEach((ingredient) => {
        orderPrice += ingredient.price; 
      });
  
      return orderPrice;
    }

    return getOrderPrice(selectedIngredientsDefined);
  };
}