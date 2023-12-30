import { DataWithUserDetails, Ingredient, LogoutResponseData, Message, OrderData, OrderNumber, ResetPasswordData, ResponseWithFullOrderDetails, ResponseWithIngredientsArray, ResponseWithOrderNumber, UserData, UserDataWithTokens } from "./burger-api-types";


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
//   return fetch(url, options).then(checkResponse)
// }



export const getIngredients = (): Promise<ResponseWithIngredientsArray> => {
  return fetch(`${API_URL}/ingredients`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(checkResponse<ResponseWithIngredientsArray>)
};


export const getOrderDetails = (idArray: string[]): Promise<ResponseWithOrderNumber> => {
  return fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem('accessToken') || ""
    },
    body: JSON.stringify({
      "ingredients": idArray
    })
  })
  .then(checkResponse<ResponseWithOrderNumber>)
};


export const getOrderByNumber = (number: number): Promise<ResponseWithFullOrderDetails> => {
  return fetch(`${API_URL}/orders/${number}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(checkResponse<ResponseWithFullOrderDetails>)
};





///// ЗАПРОСЫ, СВЯЗАННЫЕ С РОУТИНГОМ /////

// Запрос для авторизации пользователя
// Это неавторизованный запрос (без передачи на сервер токена)
export const loginUser = (email: string, password: string): Promise<UserDataWithTokens> => {
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
  .then(checkResponse<UserDataWithTokens>)
};


// Запрос для регистрации
// Это неавторизованный запрос (без передачи на сервер токена)
export const registerUser = (name: string, email: string, password: string): Promise<UserDataWithTokens> => {
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
  .then(checkResponse<UserDataWithTokens>)
}


// Запрос для опознания пользователя, забывшего пароль, по его мейлу
// Это неавторизованный запрос (без передачи на сервер токена)
export const recognizeUser = (email: string): Promise<ResetPasswordData> => {
  return fetch(`${API_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "email": email
    })
  })
  .then(checkResponse<ResetPasswordData>)
}



// Запрос для reset password
// Это неавторизованный запрос (без передачи на сервер токена)
export const resetPassword = (password: string, token: string): Promise<ResetPasswordData> => {
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
  .then(checkResponse<ResetPasswordData>)
}


// Запрос для выхода из системы
// (авторизованный запрос)
export const logoutUser = (): Promise<LogoutResponseData> => {
  return fetchWithRefresh(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "token": localStorage.getItem('refreshToken')
   })
  })
  .then(checkResponse<LogoutResponseData>)
};


// Авторизованный запрос на получение данных пользователя
export const getUser = (): Promise<DataWithUserDetails> => {
  return fetchWithRefresh(`${API_URL}/auth/user`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken') || ""
    }
  })
  .then(checkResponse<DataWithUserDetails>)
};


// Авторизованный запрос на редактирование данных пользователя
export const patchUser = (name: string, email: string, password: string): Promise<DataWithUserDetails> => {
  return fetchWithRefresh(`${API_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken') || ""
    },
    body: JSON.stringify({
      "name": name,
      "email": email,
      "password": password
   })
  })
  .then(checkResponse<DataWithUserDetails>)
}



type RefreshTokenType = {
  success: boolean,
  refreshToken: string,
  accessToken: string
}

export const refreshToken = (): Promise<RefreshTokenType> => {
  return fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
  .then(checkResponse<RefreshTokenType>)
};



// Универсальная функция, внутри которой автоматически срабатывает обновление токена,
// если он протух
// Вызывать ее вместо fetch в других запросах, где есть токен авторизации
// Это универсальная функция: как для запроса данных user, так и для 
// других запросов, которые требуют авторизации
export const fetchWithRefresh = async (
  url: string, 
  options: RequestInit & { headers: { authorization?: string, "Content-Type": string } & { body?: string }} ): Promise<Response> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};


