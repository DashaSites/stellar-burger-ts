import { registerUser } from '../../utils/burger-api';
import { AppThunk } from '../store/store';
import { setAuthChecked } from './authorizationActions';



// Типы для экшенов регистрации
export type RegisterUserRequestType = 'REGISTER_USER_REQUEST';
export type RegisterUserSuccessType = 'REGISTER_USER_SUCCESS';
export type RegisterUserErrorType = 'REGISTER_USER_ERROR';

// Экшены регистрации для редьюсера registrationReducer
export const REGISTER_USER_REQUEST: RegisterUserRequestType = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS: RegisterUserSuccessType = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR: RegisterUserErrorType = 'REGISTER_USER_ERROR';

// Описания типов экшенов регистрации для registrationReducer
export type RegisterUserRequestAction = {
  type: RegisterUserRequestType
};

export type RegisterUserSuccessAction = {
  type: RegisterUserSuccessType,
  payload: {
    accessToken: string, 
    refreshToken: string, 
    userEmail: string | null,
    userName: string | null
  }
};

export type RegisterUserErrorAction = {
  type: RegisterUserErrorType
};



// Объединяю все экшены в union-тип для передачи в редьюсер
export type UserRegistrationActions = 
    | RegisterUserRequestAction
  | RegisterUserSuccessAction
  | RegisterUserErrorAction;



// Асинхронный запрос к серверу для регистрации пользователя (функция с мидлваром)
export const getFetchedRegisteredUser = (name: string, email: string, password: string): AppThunk => { 
  return (dispatch) => {
    // флажок о начале загрузки
    dispatch({
        type: REGISTER_USER_REQUEST
    })

    registerUser(name, email, password) // Передаю на сервер введенные юзером имя, имейл и пароль
    .then((res) => {
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: {
              accessToken: res.accessToken, 
              refreshToken: res.refreshToken, 
              userEmail: res.user.email,
              userName: res.user.name
            },
          });
          dispatch(setAuthChecked(true));
    }).catch((err) => {
        console.log(err);
        // Если сервер не вернул данных, отправляем экшен об ошибке
        dispatch({
            type: REGISTER_USER_ERROR
        })
    })
  }   
}