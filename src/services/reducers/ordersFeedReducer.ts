import {
  LOAD_ALL_ORDERS_WS_CONNECT,
  LOAD_ALL_ORDERS_WS_CONNECTING,
  LOAD_ALL_ORDERS_WS_OPEN,
  LOAD_ALL_ORDERS_WS_CLOSE,
  LOAD_ALL_ORDERS_WS_ERROR,
  LOAD_ALL_ORDERS_WS_MESSAGE,
  LoadAllOrdersWsActions
} from '../actions/socketActions';
import { WebsocketStatus } from '../../utils/socketData';
import { OrderData } from '../../utils/burger-api-types';


type State = {
  allOrders: OrderData[],
  status: string,
  total: null | number,
  totalToday: null | number,
  isOrdersFeedLoading: boolean,
  connectionError: string
};

// initialState for ordersFeedReducer
const ordersFeedInitialState: State = {
  allOrders: [],
  status: WebsocketStatus.OFFLINE,
  total: null,
  totalToday: null,
  isOrdersFeedLoading: false,
  connectionError: ''
};

// 1) Редьюсер для загрузки заказов, сделанных всеми пользователями
export const ordersFeedReducer = (state = ordersFeedInitialState, action: LoadAllOrdersWsActions): State => {
  switch (action.type) {
    case LOAD_ALL_ORDERS_WS_CONNECT: {
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
        isOrdersFeedLoading: true
      };
    }
    case LOAD_ALL_ORDERS_WS_CONNECTING: {
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
        isOrdersFeedLoading: true
      };
    }
    case LOAD_ALL_ORDERS_WS_OPEN: {
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        isOrdersFeedLoading: false,
        connectionError: ''
      };
    }
    case LOAD_ALL_ORDERS_WS_CLOSE: {
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
        isOrdersFeedLoading: false
      };
    }
    case LOAD_ALL_ORDERS_WS_ERROR: {
      return {
        ...ordersFeedInitialState,
        connectionError: action.payload,
        isOrdersFeedLoading: false
      };
    }
    case LOAD_ALL_ORDERS_WS_MESSAGE: {
      return {
        ...state,
        allOrders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        isOrdersFeedLoading: false
      };
    }
    default: {
      return state;
    }
  }
};