import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { store } from './Store/store';
import { BrowserRouter } from 'react-router-dom';
import NotistackWrapper from 'components/Notifications/notifiicatiowrapper';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NotistackWrapper>
          <App />
        </NotistackWrapper>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
