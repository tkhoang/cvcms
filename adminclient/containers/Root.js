if (process.env.NODE_ENV === 'production') {
	console.log ('prd')
	module.exports = require('./Root.prod')
} else {
	console.log ('dev')
	module.exports = require('./Root.dev')
}
