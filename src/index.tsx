import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { store } from "./services/store/store";
import { HTML5Backend } from 'react-dnd-html5-backend'; // Контекст для dnd
import { DndProvider } from 'react-dnd';
import { BrowserRouter as Router } from 'react-router-dom';



// "!" говорит тайпскрипту о том, что тип выражения, которое стоит до него, не может быть null

// К такому же приему (подавить замечание через "!") можно прибегнуть в модалке, где я достаю элемент,
// который является корнем для портала
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}> 
        <Router>
          <App />
        </Router>
      </Provider> 
    </DndProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
