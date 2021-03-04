import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Socket } from 'react-socket-io';

const uri = 'http://localhost:5000';
const options = { transports: ['websocket'] };

ReactDOM.render(
  <React.StrictMode>
    <Socket uri={uri} options={options}> 
      <App />
    </Socket>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
