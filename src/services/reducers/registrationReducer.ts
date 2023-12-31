import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  UserRegistrationActions
} from '../actions/registrationActions';

import { AuthorizationState, initialState } from './authorizationReducer';


// Регистрация
export const registrationReducer = (state = initialState, action: UserRegistrationActions): AuthorizationState => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        isError: false
      };
    }
    case REGISTER_USER_SUCCESS: {
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      return {
        ...state,
        isRegistered: true,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail,
      };
    }
    case REGISTER_USER_ERROR: {
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