import { Ingredient } from "../../utils/burger-api-types";
import {
  LOAD_INGREDIENTS_REQUEST,
  LOAD_INGREDIENTS_SUCCESS,
  LOAD_INGREDIENTS_ERROR,
  LoadIngredientsActions
} from "../actions/ingredientsActions";


type State = {
  ingredients: Array<Ingredient>,
  isLoading: boolean,
  isError: boolean
};



// initialState for ingredientsReducer
const ingredientsInitialState: State = {
  ingredients: [],
  isLoading: false,
  isError: false
};


// Редьюсер для загрузки ингредиентов с сервера
export const ingredientsReducer = (state = ingredientsInitialState, action: LoadIngredientsActions): State => {
  switch (action.type) {
    case LOAD_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOAD_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        isLoading: false,
        isError: false,
      };
    }
    case LOAD_INGREDIENTS_ERROR: {
      return {
        ...ingredientsInitialState,
        isError: true,
      };
    }
    default: {
      return state;
    }
  }
};