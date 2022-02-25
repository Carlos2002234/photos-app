import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import generateStore from './Redux/store';
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Router, Routes, Route, Link } from "react-router-dom";


const store = generateStore();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
   
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
