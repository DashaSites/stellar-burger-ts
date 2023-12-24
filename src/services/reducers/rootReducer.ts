import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer';
import { constructorReducer } from './constructorReducer';
import { authorizationReducer } from './authorizationReducer';
import { registrationReducer } from './registrationReducer';
import { orderDetailsReducer } from './orderDetailsReducer';



// Корневой редьюсер
export const rootReducer = combineReducers({
  ingredientsState: ingredientsReducer, // получение ингредиентов с сервера
  constructorState: constructorReducer, // получение ингредиентов в конструкторе: и через загрузку, и через дроп
  orderDetailsState: orderDetailsReducer, // получение с сервера номера заказа
  authorizationState: authorizationReducer, // получение с сервера инфы об авторизации
  registrationState: registrationReducer, // получение с сервера инфы о регистрации пользователя
  // ordersFeedState: ordersFeedReducer, // получение с сервера всей инфы о заказах всех покупателей
  // ordersHistoryState: ordersHistoryReducer, // получение с сервера истории заказов пользователя
  // fullOrderFoundByNumberState: fullOrderFoundByNumberReducer // получение всей инфы о заказе по его номеру
})