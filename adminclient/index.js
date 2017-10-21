/* eslint-env browser */

__webpack_public_path__ = '/admin/build/'

import Root from './components/Root';
import configureStore from './store';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

const store = configureStore();
window.dev = { store };

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);

