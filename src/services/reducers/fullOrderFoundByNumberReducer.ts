import { OrderData } from "../../utils/burger-api-types";
import {
  GET_FULL_ORDER_DETAILS_REQUEST,
  GET_FULL_ORDER_DETAILS_SUCCESS,
  GET_FULL_ORDER_DETAILS_ERROR,
  GetFullOrderDetailsActions
} from "../actions/orderDetailsActions";

type State = {
  order: null | OrderData,
  isError: boolean,
  isLoading: boolean
};

// initialState for fullOrderFoundByNumberReducer
const initialState: State = {
  order: null, // значение null будет прочитано в компоненте OrderFullInfo как falsy (в отличие от "[]", который был бы прочитан как truthy)
  isError: false,
  isLoading: false
};

// Получение всех деталей заказа, которые нашлись на сервере по номеру заказа
export const fullOrderFoundByNumberReducer = (state = initialState, action: GetFullOrderDetailsActions): State => {
  switch (action.type) {
    case GET_FULL_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        isError: false,
        isLoading: true
      };
    }
    case GET_FULL_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        order: action.payload,
        isError: false,
        isLoading: false
      };
    }
    case GET_FULL_ORDER_DETAILS_ERROR: {
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