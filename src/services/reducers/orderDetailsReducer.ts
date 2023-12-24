import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_ERROR,
  GetOrderDetailsActions
} from "../actions/orderDetailsActions.js";


type State = {
  orderNumber: null | number,
  isError: boolean,
  isLoading: boolean
};

// initialState for orderDetailsReducer
const initialState: State = {
  orderNumber: null,
  isError: false,
  isLoading: false
};

// Получение и обновление номера заказа в попапе
export const orderDetailsReducer = (state = initialState, action: GetOrderDetailsActions): State => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        isError: false,
        isLoading: true
      };
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        orderNumber: action.payload,
        isError: false,
        isLoading: false
      };
    }
    case GET_ORDER_DETAILS_ERROR: {
      return {
        ...state,
        isError: true,
        isLoading: false
      };
    }
    default: {
      return state;
    }
  }
};