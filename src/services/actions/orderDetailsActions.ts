import { OrderData } from "../../utils/burger-api-types.js";
import { getOrderDetails, getOrderByNumber } from "../../utils/burger-api.js";
import { AppThunk } from "../store/store.js";

// ДЛЯ РЕДЬЮСЕРА orderDetailsReducer

// Типы экшенов для orderDetailsReducer
export type GetOrderDetailsRequestType = 'GET_ORDER_DETAILS_REQUEST';
export type GetORderDetailsSuccessType = 'GET_ORDER_DETAILS_SUCCESS';
export type GetOrderDetailsErrorType = 'GET_ORDER_DETAILS_ERROR';

// экшены для orderDetailsReducer 
export const GET_ORDER_DETAILS_REQUEST: GetOrderDetailsRequestType = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS: GetORderDetailsSuccessType = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_ERROR: GetOrderDetailsErrorType = 'GET_ORDER_DETAILS_ERROR';

// Описание типов экшенов для orderDetailsReducer
export type GetOrderDetailsRequestAction = {
  type: GetOrderDetailsRequestType
};

export type GetOrderDetailsSuccessAction = {
  type: GetORderDetailsSuccessType,
  payload: number
};

export type GetOrderDetailsErrorAction = {
  type: GetOrderDetailsErrorType
};

// Объединяю экшены в union-тип для передачи в orderDetailsReducer
export type GetOrderDetailsActions = 
    | GetOrderDetailsRequestAction
  | GetOrderDetailsSuccessAction
  | GetOrderDetailsErrorAction;



// ДЛЯ РЕДЬЮСЕРА fullOrderFoundByNumberReducer

// Типы экшенов для fullOrderFoundByNumberReducer 
export type GetFullOrderDetailsRequestType = 'GET_FULL_ORDER_DETAILS_REQUEST';
export type GetFullOrderDetailsSuccessType = 'GET_FULL_ORDER_DETAILS_SUCCESS';
export type GetFullOrderDetailsErrorType = 'GET_FULL_ORDER_DETAILS_ERROR';

// экшены для fullOrderFoundByNumberReducer 
export const GET_FULL_ORDER_DETAILS_REQUEST: GetFullOrderDetailsRequestType = 'GET_FULL_ORDER_DETAILS_REQUEST';
export const GET_FULL_ORDER_DETAILS_SUCCESS: GetFullOrderDetailsSuccessType = 'GET_FULL_ORDER_DETAILS_SUCCESS';
export const GET_FULL_ORDER_DETAILS_ERROR: GetFullOrderDetailsErrorType = 'GET_FULL_ORDER_DETAILS_ERROR';

// Описание типов экшенов для fullOrderFoundByNumberReducer
export type GetFullOrderDetailsRequestAction = {
  type: GetFullOrderDetailsRequestType
};

export type GetFullOrderDetailsSuccessAction = {
  type: GetFullOrderDetailsSuccessType,
  payload: OrderData
};

export type GetFullOrderDetailsErrorAction = {
  type: GetFullOrderDetailsErrorType
};


// Объединяю экшены в union-тип для передачи в fullOrderFoundByNumberReducer
export type GetFullOrderDetailsActions = 
    | GetFullOrderDetailsRequestAction
  | GetFullOrderDetailsSuccessAction
  | GetFullOrderDetailsErrorAction;




  // ! ТИПИЗИРОВАТЬ ЭТУ ФУНКЦИЮ ВМЕСТЕ СО СТОРОМ
  // Асинхронный запрос за всеми деталями заказа (по его номеру)
  export const getFetchedFullOrderDetails = (number: number): AppThunk => { 
    return (dispatch) => {
      // флажок о начале загрузки
      dispatch({
          type: GET_FULL_ORDER_DETAILS_REQUEST
      })

      getOrderByNumber(number) // прокидываю номер заказа в запросе к серверу
      .then((res) => {
          dispatch({
              type: GET_FULL_ORDER_DETAILS_SUCCESS, 
              payload: res.orders[0] // получаю единственный заказ, который лежит в пришедшем с сервера массиве
            })
      }).catch((err) => {
          console.log(err);
          // Если сервер не вернул данных, отправляем экшен об ошибке
          dispatch({
              type: GET_FULL_ORDER_DETAILS_ERROR
          })
      })
    }   
  }


  // Асинхронный запрос к серверу за номером заказа (функция с мидлваром)
  export const getFetchedOrderDetailsFromApi = (array: string[]): AppThunk => { 
    return (dispatch) => {
      // флажок о начале загрузки
      dispatch({
          type: GET_ORDER_DETAILS_REQUEST
      })

      getOrderDetails(array) // Прокинем массив id в запросе к серверу
      .then((res) => {
          dispatch({
              type: GET_ORDER_DETAILS_SUCCESS, 
              payload: res.order.number
            })
      }).catch((err) => {
          console.log(err);
          // Если сервер не вернул данных, отправляем экшен об ошибке
          dispatch({
              type: GET_ORDER_DETAILS_ERROR
          })
      })
    }   
  }