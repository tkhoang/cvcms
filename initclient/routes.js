import React from 'react'
import { Route , IndexRoute } from 'react-router'
import App from './containers/App'
import LoginPage from './containers/LoginPage'

export default 
	<Route path="/" component={App} >
		<IndexRoute component={App} />
		<Route path="/login" component={LoginPage} />
	</Route>
