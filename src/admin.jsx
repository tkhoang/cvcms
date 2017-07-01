var LoginPage = require('./LoginPage');
var AppPage = require('./AppPage');

var Admin = React.createClass({
  
	callAuthService : function (auth) {
		console.log('handleAuthSubmit Page , nbTryAuth = '+ this.state.nbTryAuth);
		console.log('trying to auth = '+auth.login + '/' + auth.password);
		if(auth.login.length > 3 && auth.password.length > 3)
			this.setState({auth: true});
		else{
			var nbTryAuth = this.state.nbTryAuth+1;
			this.setState({auth: false, nbTryAuth: nbTryAuth});
		}
	},
	
	getInitialState: function () {
		return {auth: false, nbTryAuth: 0};
	},
	
  	render: function () {
  		console.log('render this.state.nbTryAuth='+this.state.nbTryAuth);
  		if(!this.state.auth){
    		return (
    			<LoginPage 
    				handleAuthSubmit={this.callAuthService} 
    				nbTryAuth={this.state.nbTryAuth}
    			/>);
    	}else{
    		return (<AppPage/>);
    	}
  	}
});



var mountNode = document.getElementById('container');
ReactDOM.render(<Admin/>, mountNode); 

