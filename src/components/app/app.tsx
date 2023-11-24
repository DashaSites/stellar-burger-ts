import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HomePage } from '../../pages/home/home';


function App() {

  const location = useLocation();

  const background = location.state && location.state.background;



  return (
  <div>
    <p>SOME TEXT</p>
    <Routes location={background || location}>
              <Route path="/" element={<HomePage />} />

            </Routes>

    </div>
  );
}

export default App;