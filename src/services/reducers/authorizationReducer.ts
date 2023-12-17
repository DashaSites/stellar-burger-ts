import {
  AUTHORIZE_USER_REQUEST,
  AUTHORIZE_USER_SUCCESS,
  AUTHORIZE_USER_ERROR,
  SET_AUTH_CHECKED,
  UserAuthorizationActions
} from "../actions/authorizationActions";


export type AuthorizationState = {
  isRegistered: boolean,
  isAuthorized: boolean,
  userName: string | null,
  userEmail: string | null,
  isError: boolean,
  isAuthChecked: boolean
};

// initialState for authorizationReducer
export const initialState: AuthorizationState = {
  isRegistered: false,
  isAuthorized: false,
  userName: null,
  userEmail: null,
  isError: false,
  isAuthChecked: false
};

// Авторизация в окне login
export const authorizationReducer = (state = initialState, action: UserAuthorizationActions): AuthorizationState => {
  switch (action.type) {
    case SET_AUTH_CHECKED: { 
      return {
        ...state,
        isAuthChecked: action.payload
      };
    }
    case AUTHORIZE_USER_REQUEST: {
      return {
        ...state,
        isError: false
      };
    }
    case AUTHORIZE_USER_SUCCESS: {
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      return {
        ...state,
        isAuthorized: true,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail
      };
    }
    case AUTHORIZE_USER_ERROR: {
      return {
        ...state,
        isError: true
      };
    }
    default: {
      return state;
    }
  }
};