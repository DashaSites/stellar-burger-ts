import { v4 as uuidv4 } from "uuid";
import { getIngredients } from "../../utils/burger-api";
import { Ingredient } from "../../models/ingredient-models";


// Типы экшенов 
export type LoadIngredientsRequestType = 'LOAD_INGREDIENTS_REQUEST';
export type LoadIngredientsSuccessType = 'LOAD_INGREDIENTS_SUCCESS';
export type LoadIngredientsErrorType = 'LOAD_INGREDIENTS_ERROR';


// Константы экшенов для редьюсера ingredientsReducer 
export const LOAD_INGREDIENTS_REQUEST: LoadIngredientsRequestType = 'LOAD_INGREDIENTS_REQUEST';
export const LOAD_INGREDIENTS_SUCCESS: LoadIngredientsSuccessType = 'LOAD_INGREDIENTS_SUCCESS';
export const LOAD_INGREDIENTS_ERROR: LoadIngredientsErrorType = 'LOAD_INGREDIENTS_ERROR';


// Объединяю типы в union-тип, чтобы передать их в редьюсер в объединенном виде
export type LoadIngredientsActionsTypes = 
    | LoadIngredientsRequestType
  | LoadIngredientsSuccessType
  | LoadIngredientsErrorType;





export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const DROP_INGREDIENT_BUN = 'DROP_INGREDIENT_BUN';
export const DROP_INGREDIENT_MIDDLE = 'DROP_INGREDIENT_MIDDLE';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export const GET_CLICKED_INGREDIENT = 'GET_CLICKED_INGREDIENT';



// экшен-криейтор для удаления элемента конструктора
export function deleteIngredient(_id: string) {
  return {
    type: DELETE_INGREDIENT,
    payload: _id
  }
}



// экшен-криейтор для бросания ингредиента (он добавляет ин-ту key с уникальным номером)
export function dropIngredientWithUuid(droppedIngredient: Ingredient) {
  return {
    type: DROP_INGREDIENT_MIDDLE,
    payload: { ...droppedIngredient, key: uuidv4() }
  }
}


// Запрос к серверу для начальной загрузки ингредиентов
export function getFetchedIngredientsFromApi() { // функция с мидлваром
  return (dispatch: any) => {
      // флажок о начале загрузки
      dispatch({
          type: LOAD_INGREDIENTS_REQUEST
        })

      getIngredients()
      .then((res) => {
          dispatch({
              type: LOAD_INGREDIENTS_SUCCESS, 
              payload: res.data
            })
      }).catch((err) => {
          console.log(err);
          // Если сервер не вернул данных, отправляем экшен об ошибке
          dispatch({
              type: LOAD_INGREDIENTS_ERROR
          })
      })
  }
}