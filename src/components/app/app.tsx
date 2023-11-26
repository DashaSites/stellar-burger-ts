import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";


function App() {

  const location = useLocation();
  const background = location.state && location.state.background;



  return (
  <div>
    <p>SOME TEXT</p>
    <Routes location={background || location}>
              <Route path="/" element={<HomePage />} />

              {/* Только для неавторизованных */}
              <Route path="login" element={<LoginPage/>} />
              {/* Только для неавторизованных */}
              <Route path="register" element={<RegisterPage/>} />

            </Routes>

    </div>
  );
}

export default App;