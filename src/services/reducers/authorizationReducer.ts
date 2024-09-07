import {
  AUTHORIZE_USER_REQUEST,
  AUTHORIZE_USER_SUCCESS,
  AUTHORIZE_USER_ERROR,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  SET_AUTH_CHECKED,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_ERROR,
  EDIT_USER_DETAILS_REQUEST,
  EDIT_USER_DETAILS_SUCCESS,
  EDIT_USER_DETAILS_ERROR,
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
    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        isError: false
      };
    }
    case LOGOUT_USER_SUCCESS: {
      console.log(action.payload.message);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return {
        ...state,
        isAuthorized: false,
        userName: null,
        userEmail: null
      };
    }
    case LOGOUT_USER_ERROR: {
      return {
        ...state,
        isError: true
      };
    }
    case GET_USER_DETAILS_REQUEST: {
      return {
        ...state,
        isError: false
      };
    }
    case GET_USER_DETAILS_SUCCESS: {
      return {
        ...state,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail
      };
    }
    case GET_USER_DETAILS_ERROR: {
      return {
        ...state,
        isError: true
      };
    }
    case EDIT_USER_DETAILS_REQUEST: {
      return {
        ...state,
        isError: false
      };
    }
    case EDIT_USER_DETAILS_SUCCESS: {
      return {
        ...state,
        userName: action.payload.updatedUserName,
        userEmail: action.payload.updatedUserEmail
      };
    }
    case EDIT_USER_DETAILS_ERROR: {
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