

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