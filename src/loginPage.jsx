var LoginForm = require('./LoginForm');

var LoginPage = React.createClass({
  
	handleAuthSubmit : function (auth) {
		console.log('onAuthSubmit LoginPage');
		console.log('trying to auth = '+auth.login + '/' + auth.password);
	},
	
  	render: function () {
    	return (<LoginForm onAuthSubmit={this.handleAuthSubmit} />);
  	}
});

module.exports = LoginPage;