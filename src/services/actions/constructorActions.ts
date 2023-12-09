import { v4 as uuidv4 } from "uuid";
import { getIngredients } from "../../utils/burger-api";
import { Ingredient } from "../../models/ingredient-models";



// Типы экшенов
export type DeleteIngredientType = 'DELETE_INGREDIENT';
export type DropIngredientBunType = 'DROP_INGREDIENT_BUN';
export type DropIngredientMiddleType = 'DROP_INGREDIENT_MIDDLE';
export type MoveIngredientType = 'MOVE_INGREDIENT';


export const DELETE_INGREDIENT: DeleteIngredientType = 'DELETE_INGREDIENT';
export const DROP_INGREDIENT_BUN: DropIngredientBunType = 'DROP_INGREDIENT_BUN';
export const DROP_INGREDIENT_MIDDLE: DropIngredientMiddleType = 'DROP_INGREDIENT_MIDDLE';
export const MOVE_INGREDIENT: MoveIngredientType = 'MOVE_INGREDIENT';



// Описание типов экшенов
export type DeleteIngredientAction = {
  type: DeleteIngredientType,
  payload: Ingredient
};

export type DropIngredientBunAction = {
  type: DropIngredientBunType,
  payload: Ingredient
};

export type DropIngredientMiddleAction = {
  type: DropIngredientMiddleType,
  payload: Ingredient
};

export type MoveIngredientAction = {
  type: MoveIngredientType,
  payload: Ingredient
};


// Объединяю экшены в union-тип, чтобы передать их в редьюсер в объединенном виде
export type ConstructorActions = 
  | DeleteIngredientAction
  | DropIngredientBunAction
  | DropIngredientMiddleAction
  | MoveIngredientAction;