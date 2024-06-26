import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './app/layout/style.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { store, StoreContext } from './app/stores/store';

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <Router history={history}>
        <App />
      </Router>
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
