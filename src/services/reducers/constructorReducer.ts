import { Ingredient, ConstructorIngredient } from "../../utils/burger-api-types";
import {
  DELETE_INGREDIENT,
  DROP_INGREDIENT_BUN,
  DROP_INGREDIENT_MIDDLE,
  MOVE_INGREDIENT, 
  ConstructorActions 
} from "../actions/constructorActions";

// Сохраняю в localStorage стейт:
//!!! НОВОЕ const prevStateString = localStorage.getItem('constructorState');


type State = {
  bunIngredientID: string | null,
  middleIngredients: Array<ConstructorIngredient>
};

// initialState for constructorReducer
const initialState: State = {
  bunIngredientID: null,
  // массив ингредиентов, который содержит айдишники и уникальные ключи каждого инг-та
  middleIngredients: []
};


// Редьюсер для получения списка ингредиентов в конструкторе бургера
export const constructorReducer = (state = initialState, action: ConstructorActions): State => {
  switch (action.type) {
    case DROP_INGREDIENT_BUN: {
      const droppedIngredientBun = action.payload;

      const newState = {
        ...state,
        // перетаскиваемые булки заменяют собой булки, которые были в конструкторе раньше
        bunIngredientID: droppedIngredientBun._id,
      };

      return newState;
    }

    case DROP_INGREDIENT_MIDDLE: {
      const droppedIngredientMiddle = action.payload;

      const newState = {
        ...state,
        // перетаскиваемые начинки и соусы падают в середину конструктора
        middleIngredients: [
          ...state.middleIngredients,
          {
            id: droppedIngredientMiddle._id,
            key: droppedIngredientMiddle.key,
          },
        ],
      };

      const stringifiedConstructorState = JSON.stringify(newState);
      localStorage.setItem('constructorState', stringifiedConstructorState);
      
      return newState;
    }

    case DELETE_INGREDIENT: {
      const newState = {
        ...state,
        // возвращаю все начинки, кроме выбрасываемой
        middleIngredients: state.middleIngredients.filter(
          (middleIngredient: ConstructorIngredient) => middleIngredient.key !== action.payload
        ),
      };

      const stringifiedConstructorState = JSON.stringify(newState);
      localStorage.setItem('constructorState', stringifiedConstructorState);
      return newState;
    }
    case MOVE_INGREDIENT: {
     
      const dragIndex = action.payload.dragIndex;
      
      const hoverIndex = action.payload.hoverIndex;

      const middleIngredients = state.middleIngredients;

      const movedIngredient = middleIngredients[dragIndex];

      // Сплайсом видоизменяю массив ингредиентов в два подхода:
      middleIngredients.splice(dragIndex, 1); // то, что драгается
      middleIngredients.splice(hoverIndex, 0, movedIngredient); // то, что дропается

      return {
        ...state,
        middleIngredients: middleIngredients,
      };
    }
    default: {
      return state;
    }
  }
};