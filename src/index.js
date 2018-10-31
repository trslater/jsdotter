import React from 'react'
import ReactDOM from 'react-dom'

import 'index.css'
import App from 'App'

import log from 'common/dev/Logger'

import logMaker from 'debug'

import * as serviceWorker from 'serviceWorker'

if (process.env.NODE_ENV !== 'production') {
	logMaker.enable('JDotter:*,-JDotter:debug')
}

if (localStorage.getItem('verbose')) {
	console.log(logMaker.enabled)
	logMaker.enable('JDotter:*')
}

log.info('Starting app')
ReactDOM.render(<App />, document.getElementById('root'))
log.info('App started')

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
