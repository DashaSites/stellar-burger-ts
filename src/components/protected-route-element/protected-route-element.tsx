import React from "react";
import ReactDOM from "react-dom";
import { useSelector } from "../../services/store/store";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthCheckedSelector, userNameSelector } from "../../services/selector/authorizationSelectors";
import Preloader from "../preloader/preloader";

type Props = {
  onlyUnAuth?: boolean,
  component: React.JSX.Element,
  children?: React.ReactNode
};


type ProvidedComponent = {
  component: React.JSX.Element
};


//  МОЙ КОМПОНЕНТ
const ProtectedRoute = ({ onlyUnAuth = false, component }: Props): React.JSX.Element => {
  
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const isAuthChecked = useSelector(isAuthCheckedSelector);

  // Достаю из стора имя пользователя, если оно есть
  // то есть, соответственно, если он авторизован
  const userName = useSelector(userNameSelector);

  // Достаю текущий локейшн
  const location = useLocation();


  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Вывожу прелоадер
    return <Preloader />;
  }

  if (onlyUnAuth && userName) { // имя пользователя ненулевое и лежит в сторе, т.е. пришло с сервера =>
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !userName) { //  здесь обратная ситуация:
    // мы проверяем страницу для авторизованного пользователя, 
    // но данных о нем в сторе нет, поэтому отправляем его на логин
    // а в стейт кладем локейшн, куда он пытался попасть
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && userName Пользователь авторизован (в сторе есть имя) и роут для авторизованного пользователя

  return component;
};



export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }: ProvidedComponent): React.JSX.Element => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
);



export default ProtectedRoute;