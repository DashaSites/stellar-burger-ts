import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from "../app-header/app-header";
import { HomePage } from "../../pages/home/home";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { ProfilePage } from "../../pages/profile/profile";
import { OrdersFeed } from "../../pages/feed/feed";
import ProfileOrders from "../profile-orders/profile-orders";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import Layout from "../layout/layout";
import { PageNotFound } from "../../pages/page-not-found/not-found";
import { useSelector, useDispatch, RootState } from "../../services/store/store";
import { checkUserAuth } from "../../services/actions/authorizationActions";
import { getFetchedIngredientsFromApi } from "../../services/actions/ingredientsActions";


import { OnlyAuth, OnlyUnAuth } from "../protected-route-element/protected-route-element";
import Preloader from "../preloader/preloader";
import OrderDetails from "../order-details/order-details";


const App = (): React.JSX.Element => {

  // Достаю из стора ингредиенты с флагами isLoading и isError
  const { ingredients, isLoading, isError } = useSelector(
    (state: RootState) => state.ingredientsState
  );

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;


  useEffect(() => { // При старте приложения делаю запрос, авторизован ли юзер
    dispatch(checkUserAuth());
  }, []);


  // Достаю ингредиенты через запрос к api (асинхронная функция из файла с экшенами:
  // импортирую сюда запрос и ответ из burger-api.js
  // и обрабатываю эти данные дальше (записываю в стейт)
  useEffect(() => {
    dispatch(getFetchedIngredientsFromApi());
  }, []);



  const handleModalClose = () => {
  // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  
  return (
    <>
      {isError && "Что-то пошло не так"}
      {isLoading && <Preloader />}
      {!isError && !isLoading && ingredients.length > 0 && (
          <>
            <AppHeader />
            <Routes location={background || location}>
              <Route path="/" element={<HomePage />} />
              <Route path='ingredients/:ingredientId'
                  element={<IngredientDetails />} />

              {/* Только для неавторизованных */}
              <Route path="login" element={<OnlyUnAuth component={<LoginPage/>} />} />
              {/* Только для неавторизованных */}
              <Route path="register" element={<OnlyUnAuth component={<RegisterPage/>} />} />
              {/* Только для неавторизованных */}
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              {/* Только для неавторизованных */}
              <Route path="reset-password" element={<ResetPasswordPage />} />

              {/* Только для неавторизованных - ЛЕНТА ЗАКАЗОВ */}
              <Route path="feed" element={<OrdersFeed />} />

              <Route path="feed/:orderNumber"
                  element={<OrderDetails />} />


              {/* Только для авторизованных */}
              <Route path="/profile/" element={<OnlyAuth component={<Layout />} />}>
                {/* ключевое слово index означает, что <ProfilePage /> размещен по адресу выше */}
                <Route index element={<OnlyAuth component={<ProfilePage />} />} />
                {/* Только для авторизованных - ИСТОРИЯ ЗАКАЗОВ */}
                <Route path="orders" element={<OnlyAuth component={<ProfileOrders />} />} />
              </Route>

              {/* Когда перехожу на динамический урл, кликая по модалке с деталями заказа на странице /profile/orders, компонент с деталями этого заказа открывается в отдельном окне */}
              <Route path="/profile/orders/:orderNumber" 
                  element={<OnlyAuth component={<OrderDetails />} />} />

     
              <Route path="*" element={<PageNotFound />} />

            </Routes>

            {background && (
              <Routes>
	              <Route
	                path='ingredients/:ingredientId'
	                element={
	                  <Modal closeModals={handleModalClose}>
	                    <IngredientDetails />
	                  </Modal>
	                }
	              />
                <Route
	                path='feed/:orderNumber'
	                element={
	                  <Modal closeModals={handleModalClose}>
	                    <OrderDetails />
	                  </Modal>
	                }
	              />
                <Route
	                path='profile/orders/:orderNumber'
	                element={
	                  <Modal closeModals={handleModalClose}>
	                    <OrderDetails />
	                  </Modal>
	                }
	              />
              </Routes>
            )}
          </>
        )}
    </>
  );
};

export default App;