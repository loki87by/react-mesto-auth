import React from 'react';
import ReactDOM from 'react-dom';
// need coment next line after gh-pages deploy
import { BrowserRouter } from 'react-router-dom';
/* // uncomment next line after gh-pages deploy
import { HashRouter } from 'react-router-dom'; */
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import './index.css';

/* // uncomment next lines after gh-pages deploy
ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
      </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
); */

// need coment next 8 lines after gh-pages deploy
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
