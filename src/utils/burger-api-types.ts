// Сюда выписываю и кладу все типы, которые приходят с сервера,
// и типизирую ими все функции, которые находятся в burger-api


// Данные о пользователе, как они приходят с сервера
export type UserData = {
  email: string,
  name: string
};

export type Message = {
  message: string
};