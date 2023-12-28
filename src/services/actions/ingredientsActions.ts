import { v4 as uuidv4 } from "uuid";
import { getIngredients } from "../../utils/burger-api";
import { Ingredient } from "../../utils/burger-api-types";
import { AppThunk } from "../store/store";


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




// ! ТИПИЗИРОВАТЬ ЭТУ ФУНКЦИЮ ВМЕСТЕ СО СТОРОМ

// Запрос к серверу для начальной загрузки ингредиентов
export function getFetchedIngredientsFromApi(): AppThunk { // функция с мидлваром
  return (dispatch) => {
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