import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router , Route , browserHistory } from 'react-router'
import App from './App'
import LoginPage from '../containers/LoginPage'
//*
const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/admin" component={App} />
      <Route path="/admin/login" component={LoginPage} />
    </Router>
  </Provider>
)


Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
