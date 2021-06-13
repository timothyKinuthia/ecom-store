import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reportWebVitals from './reportWebVitals';
import reducer from './reducers/index';

const store = createStore(reducer, composeWithDevTools());


ReactDOM.render(
  <Provider store={store}>
     <BrowserRouter>
      <App />
    </BrowserRouter>
   </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
