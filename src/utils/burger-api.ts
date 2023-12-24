import { Ingredient, Message, OrderData, OrderNumber, UserData } from "./burger-api-types";


const API_URL = 'https://norma.nomoreparties.space/api';


const checkResponse = <T>(res: Response): Promise<T> => {
  // если результат окей, то checkResponse пытается распарсить тело запроса
  // В результате, если json вернет промис, мы получим объект, который нам прислал сервер
  // В каждом случае этот объект будет свой, и конкретного 
  // типа у него нет - он каждый раз разный. В каждом случае внутри промиса
  // будет тип, который вернет сервер.
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};


// Универсальная функция запроса с проверкой ответа
// (чтобы не дублировать эту проверку в каждом запросе)
// function request(url: string, options: RequestInit | undefined) {
//   // принимает два аргумента: урл и объект опций

//   // !!! Каким-то образом ставить дженериком в функции checkResponse каждый раз то, 
//   // !!! что в этот раз надо, или вообще убрать функцию request и делать без нее
//   return fetch(url, options).then(checkResponse)
// }



export const getIngredients = (): Promise<Ingredient[]> => {
  return fetch(`${API_URL}/ingredients`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(checkResponse<Ingredient[]>)
};


export const getOrderDetails = (idArray: string[]): Promise<OrderNumber> => {
  return fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem('accessToken')  || ""
    },
    body: JSON.stringify({
      "ingredients": idArray
    })
  })
  .then(checkResponse<OrderNumber>)
};


export const getOrderByNumber = (number: number): Promise<OrderData> => {
  return fetch(`${API_URL}/orders/${number}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(checkResponse<OrderData>)
};





///// ЗАПРОСЫ, СВЯЗАННЫЕ С РОУТИНГОМ /////

// Запрос для авторизации пользователя
// Это неавторизованный запрос (без передачи на сервер токена)
export const loginUser = (email: string, password: string): Promise<UserData> => {
  return fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "email": email, 
      "password": password
   })
  })
  .then(checkResponse<UserData>)
};


// Запрос для регистрации
// Это неавторизованный запрос (без передачи на сервер токена)
export const registerUser = (name: string, email: string, password: string): Promise<UserData> => {
  return fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "email": email, 
      "password": password, 
      "name": name 
    })
  })
  .then(checkResponse<UserData>)
}


// Запрос для опознания пользователя, забывшего пароль, по его мейлу
// Это неавторизованный запрос (без передачи на сервер токена)
export const recognizeUser = (email: string): Promise<UserData> => {
  return fetch(`${API_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "email": email
    })
  })
  .then(checkResponse<UserData>)
}



// Запрос для reset password
// Это неавторизованный запрос (без передачи на сервер токена)
export const resetPassword = (password: string, token: string): Promise<Message> => {
  return fetch(`${API_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "password": password,
      "token": token
    })
  })
  .then(checkResponse<Message>)
}


