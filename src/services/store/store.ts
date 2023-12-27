import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { 
  compose, 
  legacy_createStore as createStore, 
  applyMiddleware, 
  Action, 
  ActionCreator,
  combineReducers 
} from 'redux';
import thunk from 'redux-thunk';
// import { ThunkAction } from 'redux-thunk';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

// !!!!!!! ОЧЕНЬ ВАЖНО НЕ ЗАБЫТЬ ПРИ ТИПИЗАЦИИ ХУКОВ
import type {} from "redux-thunk/extend-redux";

 
// собрала все редьюсеры
import { ingredientsReducer } from '../reducers/ingredientsReducer';
import { constructorReducer } from '../reducers/constructorReducer';
import { authorizationReducer } from '../reducers/authorizationReducer';
import { registrationReducer } from '../reducers/registrationReducer';
import { orderDetailsReducer } from '../reducers/orderDetailsReducer';

// собрала объединения типов всех экшенов для каждого редьюсера
import { LoadIngredientsActions } from '../actions/ingredientsActions';
import { ConstructorActions } from '../actions/constructorActions';
import { UserAuthorizationActions } from '../actions/authorizationActions';
import { UserRegistrationActions } from '../actions/registrationActions';
import { GetOrderDetailsActions } from '../actions/orderDetailsActions'; // добавить сюда потом GetFullOrderDetailsActions для второго редьюсера с заказами




/*
import {
  LOAD_ALL_ORDERS_WS_CONNECT,
  LOAD_ALL_ORDERS_WS_DISCONNECT,
  LOAD_ALL_ORDERS_WS_OPEN,
  LOAD_ALL_ORDERS_WS_CLOSE,
  LOAD_ALL_ORDERS_WS_ERROR,
  LOAD_ALL_ORDERS_WS_MESSAGE,

  LOAD_USERS_ORDERS_WS_CONNECT,
  LOAD_USERS_ORDERS_WS_DISCONNECT,
  LOAD_USERS_ORDERS_WS_OPEN,
  LOAD_USERS_ORDERS_WS_CLOSE,
  LOAD_USERS_ORDERS_WS_ERROR,
  LOAD_USERS_ORDERS_WS_MESSAGE
} from '../actions/socketActions.js';
import { socketMiddleware } from '../middleware/socket-middleware.js';



const feedWsActions = {
  wsConnect: LOAD_ALL_ORDERS_WS_CONNECT,
  wsDisconnect: LOAD_ALL_ORDERS_WS_DISCONNECT,
  onOpen: LOAD_ALL_ORDERS_WS_OPEN,
  onClose: LOAD_ALL_ORDERS_WS_CLOSE,
  onError: LOAD_ALL_ORDERS_WS_ERROR, 
  onMessage: LOAD_ALL_ORDERS_WS_MESSAGE
}

const historyWsActions = {
  wsConnect: LOAD_USERS_ORDERS_WS_CONNECT,
  wsDisconnect: LOAD_USERS_ORDERS_WS_DISCONNECT,
  onOpen: LOAD_USERS_ORDERS_WS_OPEN,
  onClose: LOAD_USERS_ORDERS_WS_CLOSE,
  onError: LOAD_USERS_ORDERS_WS_ERROR, 
  onMessage: LOAD_USERS_ORDERS_WS_MESSAGE
}


const isAuthRequiredForFeed = false;
const isAuthRequiredForHistory = true;


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;


const feedSocketMiddleware = socketMiddleware('wss://norma.nomoreparties.space/orders/all', feedWsActions, isAuthRequiredForFeed);
const historySocketMiddleware = socketMiddleware('wss://norma.nomoreparties.space/orders', historyWsActions, isAuthRequiredForHistory);

const enhancer = composeEnhancers(applyMiddleware(thunk), 
                                  applyMiddleware(feedSocketMiddleware),
                                  applyMiddleware(historySocketMiddleware));  

*/


// Корневой редьюсер
const rootReducer = combineReducers({
  ingredientsState: ingredientsReducer, // получение ингредиентов с сервера
  constructorState: constructorReducer, // получение ингредиентов в конструкторе: и через загрузку, и через дроп
  orderDetailsState: orderDetailsReducer, // получение с сервера номера заказа
  authorizationState: authorizationReducer, // получение с сервера инфы об авторизации
  registrationState: registrationReducer, // получение с сервера инфы о регистрации пользователя
  // ordersFeedState: ordersFeedReducer, // получение с сервера всей инфы о заказах всех покупателей
  // ordersHistoryState: ordersHistoryReducer, // получение с сервера истории заказов пользователя
  // fullOrderFoundByNumberState: fullOrderFoundByNumberReducer // получение всей инфы о заказе по его номеру
})


export const store = createStore(rootReducer);

// тип корневого редьюсера
export type RootState = ReturnType<typeof rootReducer>;


// Перечисление всех типов обычных экшенов в проекте:
export type AppActions =
  | LoadIngredientsActions
  | ConstructorActions
  | UserAuthorizationActions
  | UserRegistrationActions
  | GetOrderDetailsActions;

  
  // Тип AppThunk описывает, что все мои асинхронные экшены могут
  // диспатчить только те экшены, которые описаны выше в AppActions
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActions
>;

// Тип AppDispatch - это функция, которая в качестве экшена может принимать либо
// один из обычных экшенов, либо асинхронный экшен
type AppDispatch<TReturnType = void> = (
  action: AppActions | AppThunk<TReturnType>
) => TReturnType;


// Типизирую хуки. Теперь в компонентах вместо библиотечных useDispatch и useSelector 
// надо импортировать эти и их использовать
export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;





// CНАЧАЛА ТИПИЗАЦИЯ СТОРА БЫЛА ТАКАЯ:
// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch


export const select = (selector: <TResult>(state: RootState) => TResult) => {
  const state = store.getState();
  const data = selector(state);
  return data; 
}








