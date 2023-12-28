import { loginUser, logoutUser } from '../../utils/burger-api';
import { LogoutMessage } from '../../utils/burger-api-types';
import { AppThunk } from '../store/store';


// Типы для экшенов логина
export type AuthorizeUserRequestType = 'AUTHORIZE_USER_REQUEST';
export type AuthorizeUserSuccessType = 'AUTHORIZE_USER_SUCCESS';
export type AuthorizeUserErrorType = 'AUTHORIZE_USER_ERROR';


// Экшены логина для редьюсера authorizationReducer
export const AUTHORIZE_USER_REQUEST: AuthorizeUserRequestType = 'AUTHORIZE_USER_REQUEST';
export const AUTHORIZE_USER_SUCCESS: AuthorizeUserSuccessType = 'AUTHORIZE_USER_SUCCESS';
export const AUTHORIZE_USER_ERROR: AuthorizeUserErrorType = 'AUTHORIZE_USER_ERROR';


// Описания типов экшенов логина для authorizationReducer
export type AuthorizeUserRequestAction = {
  type: AuthorizeUserRequestType
};

export type AuthorizeUserSuccessAction = {
  type: AuthorizeUserSuccessType,
  payload: {
    accessToken: string, 
    refreshToken: string, 
    userEmail: string | null,
    userName:  string | null
  }
};

export type AuthorizeUserErrorAction = {
  type: AuthorizeUserErrorType
};




// Тип для экшена проверки пользователя, был ли он вообще проверен
export type SetAuthCheckedType = 'SET_AUTH_CHECKED';

// Экшен проверки: был ли пользователь проверен на наличие авторизации
export const SET_AUTH_CHECKED: SetAuthCheckedType = 'SET_AUTH_CHECKED';

// Описание типа экшена для этой проверки
export type SetAuthCheckedAction = {
  type: SetAuthCheckedType,
  payload: boolean
};


///// ЭКШЕНЫ ДЛЯ ЛОГАУТА

// Типы для экшенов логаута
export type LogoutUserRequestType = 'LOGOUT_USER_REQUEST';
export type LogoutUserSuccessType = 'LOGOUT_USER_SUCCESS';
export type LogoutUserErrorType = 'LOGOUT_USER_ERROR';


// Экшены логаута для authorizationReducer
export const LOGOUT_USER_REQUEST: LogoutUserRequestType = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS: LogoutUserSuccessType = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_ERROR: LogoutUserErrorType = 'LOGOUT_USER_ERROR';


// Описания типов экшенов логаута для authorizationReducer
export type LogoutUserRequestAction = {
  type: LogoutUserRequestType
};

export type LogoutUserSuccessAction = {
  type: LogoutUserSuccessType,
  payload: LogoutMessage
};

export type LogoutUserErrorAction = {
  type: LogoutUserErrorType
};




/////




// Объединяю все экшены в union-тип для передачи в редьюсер
export type UserAuthorizationActions = 
    | AuthorizeUserRequestAction
  | AuthorizeUserSuccessAction
  | AuthorizeUserErrorAction
  | SetAuthCheckedAction
  | LogoutUserRequestAction
  | LogoutUserSuccessAction
  | LogoutUserErrorAction;




// Экшн-криейтор для создания экшена, который будет в редьюсере 
// устанавливать флажок isAuthChecked
// (проверяет: "был ли этот пользователь проверен на наличие авторизации?")
export const setAuthChecked = (value: boolean) => ({
  type: SET_AUTH_CHECKED,
  payload: value
});



// Асинхронный запрос для логина (функция с мидлваром)
export const getFetchedAuthorizedUser = (email: string, password: string): AppThunk => { 
  return (dispatch) => {
    // флажок о начале загрузки
    dispatch({
        type: AUTHORIZE_USER_REQUEST
    })

    loginUser(email, password) // Передаю на сервер введенные юзером имейл и пароль
    .then((res) => {
        dispatch({
            type: AUTHORIZE_USER_SUCCESS,
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
            type: AUTHORIZE_USER_ERROR
        })
    })
  }   
}


// Асинхронный (с мидлваром) запрос к серверу для выхода из системы
export const getUserLoggedOut = (): AppThunk => { 
  return (dispatch) => {
    // флажок о начале загрузки
    dispatch({
        type: LOGOUT_USER_REQUEST
    })

    logoutUser()
    .then((res) => {
        dispatch({
            type: LOGOUT_USER_SUCCESS,
            payload: {
              message: res.message
            },
          });
    }).catch((err) => {
        console.log(err);
        // Если сервер не вернул данных, отправляем экшен об ошибке
        dispatch({
            type: LOGOUT_USER_ERROR
        })
    })
  }   
}