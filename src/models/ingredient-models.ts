// Ингредиент, как он приходит с сервера
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

// Ингредиент, который попадает в конструктор
export type ConstructorIngredient = {
  id: string,
  key: string
};

