import { Ingredient } from "../../models/ingredient-models.js";
import {
  LOAD_INGREDIENTS_REQUEST,
  LOAD_INGREDIENTS_SUCCESS,
  LOAD_INGREDIENTS_ERROR,
  LoadIngredientsActionsTypes
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

type Action = {
  type: LoadIngredientsActionsTypes
  payload: unknown
};


// Редьюсер для загрузки ингредиентов с сервера
export const ingredientsReducer = (state = ingredientsInitialState, action: Action): State => {
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
        ingredients: action.payload as Array<Ingredient>, // Приведение общего типа к конкретному типу. В toolkit можно будет обойтись без этой конструкции "as".
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