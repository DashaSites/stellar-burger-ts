import { v4 as uuidv4 } from "uuid";
import { getIngredients } from "../../utils/burger-api";
import { Ingredient } from "../../utils/burger-api-types";



// Типы экшенов
export type DeleteIngredientType = 'DELETE_INGREDIENT';
export type DropIngredientBunType = 'DROP_INGREDIENT_BUN';
export type DropIngredientMiddleType = 'DROP_INGREDIENT_MIDDLE';
export type MoveIngredientType = 'MOVE_INGREDIENT';


export const DELETE_INGREDIENT: DeleteIngredientType = 'DELETE_INGREDIENT';
export const DROP_INGREDIENT_BUN: DropIngredientBunType = 'DROP_INGREDIENT_BUN';
export const DROP_INGREDIENT_MIDDLE: DropIngredientMiddleType = 'DROP_INGREDIENT_MIDDLE';
export const MOVE_INGREDIENT: MoveIngredientType = 'MOVE_INGREDIENT';


type IngredientWithKey = Ingredient & {
  key: string;
};


type MoveIngredientPayload = {
  dragIndex: number,
  hoverIndex: number
};

// Описание типов экшенов
export type DeleteIngredientAction = {
  type: DeleteIngredientType,
  payload: IngredientWithKey
};

export type DropIngredientBunAction = {
  type: DropIngredientBunType,
  payload: Ingredient
};

export type DropIngredientMiddleAction = {
  type: DropIngredientMiddleType,
  payload: IngredientWithKey
};


export type MoveIngredientAction = {
  type: MoveIngredientType,
  payload: MoveIngredientPayload
};



// Объединяю экшены в union-тип, чтобы передать их в редьюсер в объединенном виде
export type ConstructorActions = 
  | DeleteIngredientAction
  | DropIngredientBunAction
  | DropIngredientMiddleAction
  | MoveIngredientAction;



// экшен-криейтор для бросания ингредиента 
// (он добавляет объекту ингредиента key с уникальным номером)
export function dropIngredientWithUuid(droppedIngredient: Ingredient) {
  return {
    type: DROP_INGREDIENT_MIDDLE,
    payload: { ...droppedIngredient, key: uuidv4() }
  }
}


export function deleteIngredient(_id: string) {
  return {
    type: DELETE_INGREDIENT,
    payload: _id
  }
}

