// Сюда выписываю и кладу все типы, которые приходят с сервера,
// и типизирую ими все функции, которые находятся в burger-api


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

export type DataWithIngredients = {
  data: Array<Ingredient>
};

export type ConstructorIngredientWithKey = Ingredient & {
  key: string
};


// Ингредиент, который попадает в конструктор
export type ConstructorIngredient = {
  id: string,
  key: string
};


// Данные о пользователе, как они приходят с сервера
export type UserData = {
  email: string | null,
  name: string | null
};


export type UserDataWithTokens = {
  accessToken: string,
  refreshToken: string,
  user: UserData
};


export type Message = {
  message: string
};

export type LogoutMessage = {
  message: string
};

export type OrderOwner = UserData & {
  createdAt: string,
  updatedAt: string
};


// Данные о заказе, как они приходят с сервера
export type OrderData = {
  createdAt: string,
  ingredients: Ingredient[],
  name: string,
  number: number,
  owner: OrderOwner,
  price: number,
  status: string,
  updatedAt: string,
  _id: string
};

export type OrderNumber = Pick<OrderData, "number">;

export type ResponseWithOrderNumber = {
  success: boolean,
  order: OrderData,
  name: string
};

export type ResponseWithIngredientsArray = {
  success: boolean,
  data: Ingredient[]
};

export type DataWithUserDetails = {
  success: boolean,
  user: UserData
};

export type ResetPasswordData = {
  success: boolean,
  message: string
};

export type ResponseWithFullOrderDetails = {
  success: boolean,
  orders: OrderData[]
};

export type LogoutResponseData = {
  success: boolean,
  message: string
};