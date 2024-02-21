import React from 'react';
import ReactDOM from 'react-dom/client';
import ContextProvider from '@/shared/ContextProvider';
import reportWebVitals from './reportWebVitals';
import './index.less';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App />
  </ContextProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
