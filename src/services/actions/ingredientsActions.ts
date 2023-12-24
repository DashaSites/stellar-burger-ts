import { v4 as uuidv4 } from "uuid";
import { getIngredients } from "../../utils/burger-api";
import { Ingredient } from "../../utils/burger-api-types";


// Типы экшенов 
export type LoadIngredientsRequestType = 'LOAD_INGREDIENTS_REQUEST';
export type LoadIngredientsSuccessType = 'LOAD_INGREDIENTS_SUCCESS';
export type LoadIngredientsErrorType = 'LOAD_INGREDIENTS_ERROR';


// Константы экшенов для редьюсера ingredientsReducer 
export const LOAD_INGREDIENTS_REQUEST: LoadIngredientsRequestType = 'LOAD_INGREDIENTS_REQUEST';
export const LOAD_INGREDIENTS_SUCCESS: LoadIngredientsSuccessType = 'LOAD_INGREDIENTS_SUCCESS';
export const LOAD_INGREDIENTS_ERROR: LoadIngredientsErrorType = 'LOAD_INGREDIENTS_ERROR';


// Описание типов экшенов
export type LoadIngredientsRequestAction = {
  type: LoadIngredientsRequestType,
  payload: never
};

export type LoadIngredientsSuccessAction = {
  type: LoadIngredientsSuccessType,
  payload: Array<Ingredient>
};

export type LoadIngredientsErrorAction = {
  type: LoadIngredientsErrorType,
  payload: never
};


// Объединяю экшены в union-тип, чтобы передать их в редьюсер в объединенном виде
export type LoadIngredientsActions = 
    | LoadIngredientsRequestAction
  | LoadIngredientsSuccessAction
  | LoadIngredientsErrorAction;




export const GET_CLICKED_INGREDIENT = 'GET_CLICKED_INGREDIENT';


///// ЭТИ ФУНКЦИИ ПЕРЕНЕСЕНЫ В constructorActions.ts

// экшен-криейтор для удаления элемента конструктора
// export function deleteIngredient(_id: string) {
//   return {
//     type: DELETE_INGREDIENT,
//     payload: _id
//   }
// }


// // экшен-криейтор для бросания ингредиента (он добавляет ин-ту key с уникальным номером)
// export function dropIngredientWithUuid(droppedIngredient) {
//   return {
//     type: DROP_INGREDIENT_MIDDLE,
//     payload: { ...droppedIngredient, key: uuidv4() }
//   }
// }

/////


// ! ТИПИЗИРОВАТЬ ЭТУ ФУНКЦИЮ ВМЕСТЕ СО СТОРОМ

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