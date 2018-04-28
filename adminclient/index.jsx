import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
 
import { store } from './_helpers';
import { App } from './App';
import '../css/bootstrap.min.css';
import '../css/admin.css';
 
// setup fake backend
 
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

