import React from 'react'
import { Router, useRouterHistory, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import Dashboard from './dashboard'

const history = useRouterHistory(createBrowserHistory)({
	basename: '/',
})

export default (
	<Router history={history}>
		<Route path="/" component={Dashboard} />
	</Router>
)
