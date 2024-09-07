import { RootState } from "../store/store";

// Результат проверки: авторизован ли данный пользователь?

// (селектор обращается к стейту и вытаскивает из него нужный кусок)
export function isUserAuthorizedSelector(state: RootState) {
  const isUserAuthorized = state.authorizationState.isAuthorized;
  return isUserAuthorized;
}

// Имя текущего (авторизованного) пользователя
export function userNameSelector(state: RootState) {
  const userName = state.authorizationState.userName;
  return userName;
}

// Имейл текущего (авторизованного) пользователя
export function userEmailSelector(state: RootState) {
  return state.authorizationState.userEmail;
}

/// Селектор для компонента ProtectedRoute
// Результат проверки (флажок): был ли данный пользователь проверен на авторизованность
export function isAuthCheckedSelector(state: RootState) {
  const isAuthChecked = state.authorizationState.isAuthChecked;
  return isAuthChecked;
}