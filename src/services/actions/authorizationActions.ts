import { getUser, loginUser, logoutUser } from '../../utils/burger-api';
import { LogoutMessage } from '../../utils/burger-api-types';
import { AppThunk } from '../store/store';

///// ЭКШЕНЫ ДЛЯ ЛОГИНА
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



///// ЭКШЕН SET_AUTH_CHECKED
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


///// ЭКШЕНЫ ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
// Типы для экшенов получения данных пользователя
export type GetUserDetailsRequestType = 'GET_USER_DETAILS_REQUEST';
export type GetUserDetailsSuccessType = 'GET_USER_DETAILS_SUCCESS';
export type GetUserDetailsErrorType = 'GET_USER_DETAILS_ERROR';

// Экшены для получения данных пользователя
export const GET_USER_DETAILS_REQUEST: GetUserDetailsRequestType = 'GET_USER_DETAILS_REQUEST';
export const GET_USER_DETAILS_SUCCESS: GetUserDetailsSuccessType = 'GET_USER_DETAILS_SUCCESS';
export const GET_USER_DETAILS_ERROR: GetUserDetailsErrorType = 'GET_USER_DETAILS_ERROR';

// Описания типов экшенов для получения данных пользователя
export type GetUserDetailsRequestAction = {
  type: GetUserDetailsRequestType
};

export type GetUserDetailsSuccessAction = {
  type: GetUserDetailsSuccessType,
  payload: {
    userEmail: string | null,
    userName:  string | null
  }
};

export type GetUserDetailsErrorAction = {
  type: GetUserDetailsErrorType
};
/////


///// ЭКШЕНЫ ДЛЯ РЕДАКТИРОВАНИЯ ДАННЫХ ПОЛЬЗОВАТЕЛЯ

// Типы для экшенов для редактирования данных пользователя
export type EditUserDetailsRequestType = 'EDIT_USER_DETAILS_REQUEST';
export type EditUserDetailsSuccessType = 'EDIT_USER_DETAILS_SUCCESS';
export type EditUserDetailsErrorType = 'EDIT_USER_DETAILS_ERROR';

// Экшены для редактирования данных пользователя
export const EDIT_USER_DETAILS_REQUEST: EditUserDetailsRequestType = 'EDIT_USER_DETAILS_REQUEST';
export const EDIT_USER_DETAILS_SUCCESS: EditUserDetailsSuccessType = 'EDIT_USER_DETAILS_SUCCESS';
export const EDIT_USER_DETAILS_ERROR: EditUserDetailsErrorType = 'EDIT_USER_DETAILS_ERROR';


// Описания типов экшенов для редактирования данных пользователя
export type EditUserDetailsRequestAction = {
  type: EditUserDetailsRequestType
};

export type EditUserDetailsSuccessAction = {
  type: EditUserDetailsSuccessType,
  payload: {
    userEmail: string | null,
    userName:  string | null
  }
};

export type EditUserDetailsErrorAction = {
  type: EditUserDetailsErrorType
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
  | LogoutUserErrorAction
  | GetUserDetailsRequestAction
  | GetUserDetailsSuccessAction
  | GetUserDetailsErrorAction
  | GetUserDetailsRequestAction
  | EditUserDetailsSuccessAction
  | EditUserDetailsSuccessAction;




// Экшн-криейтор для создания экшена, который будет в редьюсере 
// устанавливать флажок isAuthChecked
// (проверяет: "был ли этот пользователь проверен на наличие авторизации?")
export const setAuthChecked = (value: boolean) => ({
  type: SET_AUTH_CHECKED,
  payload: value
});




// Проверочный запрос (асинхронный экшен)
export const checkUserAuth = (): AppThunk => {
  return (dispatch) => {
      if (localStorage.getItem("accessToken")) {
        getUser() // независимо от того, получили мы данные пользователя или нет, флажок выставляем в true
             .then((data) => {
              dispatch({
                type: AUTHORIZE_USER_SUCCESS,
                payload: {
                  accessToken: localStorage.getItem("accessToken") || "",
                  refreshToken: localStorage.getItem("refreshToken") || "",
                  userEmail: data.user.email,
                  userName: data.user.name
                },
              });
             })
             .catch(() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
            })
            .finally(() => dispatch(setAuthChecked(true)));
      } else {
          dispatch(setAuthChecked(true));
      }
  };
};





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



// Асинхронный (с мидлваром) запрос к серверу для получения данных пользователя
export const getFetchedUserDetails = (): AppThunk => { 
  return (dispatch) => {
    // флажок о начале загрузки
    dispatch({
        type: GET_USER_DETAILS_REQUEST
    })

    getUser()
    .then((res) => {
        dispatch({
            type: GET_USER_DETAILS_SUCCESS,
            payload: {
              userEmail: res.user.email,
              userName: res.user.name
            },
          })
    }).catch((err) => {
        console.log(err);
        // Если сервер не вернул данных, отправляем экшен об ошибке
        dispatch({
            type: GET_USER_DETAILS_ERROR
        })
    })
  }   
}


// Асинхронный (с мидлваром) запрос к серверу для редактирования данных пользователя
export const getEditedUserDetails = (name, email, password): AppThunk => { 
  return (dispatch) => {
    // флажок о начале загрузки
    dispatch({
        type: EDIT_USER_DETAILS_REQUEST
    })

    patchUser(name, email, password)
    .then((res) => {
        dispatch({
            type: EDIT_USER_DETAILS_SUCCESS,
            payload: {
              updatedUserEmail: res.user.email,
              updatedUserName: res.user.name
            },
          })
    }).catch((err) => {
        console.log(err);
        // Если сервер не вернул данных, отправляем экшен об ошибке
        dispatch({
            type: EDIT_USER_DETAILS_ERROR
        })
    })
  }   
}