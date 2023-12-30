import {
  LOAD_USERS_ORDERS_WS_CONNECT,
  LOAD_USERS_ORDERS_WS_CONNECTING,
  LOAD_USERS_ORDERS_WS_OPEN,
  LOAD_USERS_ORDERS_WS_CLOSE,
  LOAD_USERS_ORDERS_WS_ERROR,
  LOAD_USERS_ORDERS_WS_MESSAGE,
  LoadUsersOrdersWsActions
} from '../actions/socketActions';
import { WebsocketStatus } from '../../utils/socketData';
import { OrderData } from '../../utils/burger-api-types';


type State = {
  userOrders: OrderData[],
  status: string,
  isOrdersHistoryLoading: boolean,
  connectionError: string
};

// initialState for ordersHistoryReducer
const ordersHistoryInitialState: State = {
  userOrders: [],
  status: WebsocketStatus.OFFLINE,
  isOrdersHistoryLoading: false,
  connectionError: ''
};


// 1) Редьюсер для загрузки с сервера истории заказов текущего пользователя
export const ordersHistoryReducer = (state = ordersHistoryInitialState, action: LoadUsersOrdersWsActions): State => {
  switch (action.type) {
    case LOAD_USERS_ORDERS_WS_CONNECT: {
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
        isOrdersHistoryLoading: true
      };
    }
    case LOAD_USERS_ORDERS_WS_CONNECTING: {
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
        isOrdersHistoryLoading: true
      };
    }
    case LOAD_USERS_ORDERS_WS_OPEN: {
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        isOrdersHistoryLoading: false,
        connectionError: ''
      };
    }
    case LOAD_USERS_ORDERS_WS_CLOSE: {
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
        isOrdersHistoryLoading: false,
        connectionError: ''
      };
    }
    case LOAD_USERS_ORDERS_WS_ERROR: {
      return {
        ...ordersHistoryInitialState,
        connectionError: action.payload,
        isOrdersHistoryLoading: false
      };
    }
    case LOAD_USERS_ORDERS_WS_MESSAGE: {
      return {
        ...state,
        userOrders: action.payload.orders,
        isOrdersHistoryLoading: false
      };
    }
    default: {
      return state;
    }
  }
};