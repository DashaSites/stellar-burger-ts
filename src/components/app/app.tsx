import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from "../app-header/app-header";
import { HomePage } from '../../pages/home/home';
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";

import { OrdersFeed } from "../../pages/feed/feed";

import Layout from "../layout/layout";

import { PageNotFound } from "../../pages/page-not-found/not-found";
import Preloader from "../preloader/preloader";



function App(): React.JSX.Element {

  const location = useLocation();
  const background = location.state && location.state.background;



  return (
  <div>
    <AppHeader />
    <Routes location={background || location}>
              <Route path="/" element={<HomePage />} />

              {/* Только для неавторизованных */}
              <Route path="login" element={<LoginPage/>} />
              {/* Только для неавторизованных */}
              <Route path="register" element={<RegisterPage/>} />
              {/* Только для неавторизованных */}
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              {/* Только для неавторизованных */}
              <Route path="reset-password" element={<ResetPasswordPage />} />

              {/* Только для неавторизованных - ЛЕНТА ЗАКАЗОВ */}
              <Route path="feed" element={<OrdersFeed />} />



              <Route path="*" element={<PageNotFound />} />

            </Routes>

    </div>
  );
}

export default App;