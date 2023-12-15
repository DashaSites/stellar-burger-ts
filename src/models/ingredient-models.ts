// Описания типов 

export type Ingredient = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number
};


// Расширяю тип первичного ингредиента, чтобы не повторять много информации
export type ConstructorIngredient = Ingredient & { key: string };