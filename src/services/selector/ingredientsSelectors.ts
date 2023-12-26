import { Ingredient } from "../../utils/burger-api-types";
import { RootState } from "../store/store";

// Элемент ингредиента, найденный по id через constructorReducer
export function ingredientSelector(id: string) {
  return function (state: RootState) {
    const allIngredients = state.ingredientsState.ingredients;

    const ingredient = allIngredients.find((element) => element._id === id)!;

    return ingredient;
  };
}


// Общая цена заказа, найденная по id всех его ингредиентов
export function orderPriceSelector(ingredientsIds: string[]) {

  return function (state: RootState) {
    const allIngredients = state.ingredientsState.ingredients;

    const selectedIngredients: Ingredient[] = [];

    ingredientsIds.forEach((id) => {

    
      const findResult = allIngredients.find((ingredient) => ingredient._id === id)

      if (!findResult) {
        return;
      }

      selectedIngredients.push(findResult)
    })


    const getOrderPrice = (ingredientsInOrder: Ingredient[]) => {
      let orderPrice = 0;
   
      ingredientsInOrder.forEach((ingredient) => {
        orderPrice += ingredient.price; 
      });
  
      return orderPrice;
    }

    return getOrderPrice(selectedIngredients);
  };
}