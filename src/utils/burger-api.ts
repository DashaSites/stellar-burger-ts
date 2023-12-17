

const API_URL = 'https://norma.nomoreparties.space/api';


const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

// Универсальная функция запроса с проверкой ответа
// (чтобы не дублировать эту проверку в каждом запросе)
function request(url: string, options: RequestInit | undefined) {
  // принимает два аргумента: урл и объект опций, каки `fetch`
  return fetch(url, options).then(checkResponse)
}




export const getIngredients = () => {
  return request(`${API_URL}/ingredients`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
};





///// ЗАПРОСЫ, СВЯЗАННЫЕ С РОУТИНГОМ /////

// Запрос для авторизации пользователя
// Это неавторизованный запрос (без передачи на сервер токена)
export const loginUser = (email: string, password: string) => {
  return request(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "email": email, 
      "password": password
   })
  })
};


// Запрос для регистрации
// Это неавторизованный запрос (без передачи на сервер токена)
export const registerUser = (name: string, email: string, password: string) => {
  return request(`${API_URL}/auth/register`, {
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
}


// Запрос для опознания пользователя, забывшего пароль, по его мейлу
// Это неавторизованный запрос (без передачи на сервер токена)
export const recognizeUser = (email: string) => {
  return request(`${API_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "email": email
    })
  })
}


// Запрос для reset password
// Это неавторизованный запрос (без передачи на сервер токена)?
export const resetPassword = (password: string, token: string) => {
  return request(`${API_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "password": password,
      "token": token
    })
  })
}


