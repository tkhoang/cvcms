var Form = ReactBootstrap.Form;
var FormGroup = ReactBootstrap.FormGroup;
var Col = ReactBootstrap.Col;
var Button = ReactBootstrap.Button;
var ControlLabel = ReactBootstrap.ControlLabel;
var FormControl = ReactBootstrap.FormControl;
var Tooltip = ReactBootstrap.Tooltip;
var Overlay = ReactBootstrap.Overlay;

var LoginForm = React.createClass({

	getInitialState: function() {
		return {login: '', password: ''};
	},
	handleLoginChange: function(e){
		this.setState({login: e.target.value});
	},
	handlePasswordChange: function(e){
		this.setState({password: e.target.value});
	},
	secondTry: function(e) {
	console.log('secondTry');
		if(this.props.nbTryAuth>0){
			return 'error';
		}
		else{
			return '';
		}
	},
	handleSubmit: function(e){
		e.preventDefault();
		console.log('handleSubmitButton');
		var login = this.state.login.trim();
		var password = this.state.password.trim();
		if(!login||!password){
			return;
		}
		this.props.onAuthSubmit({login: login, password: password});
	},
	render: function(){
		console.log('render form nbTryAuth = ' + this.props.nbTryAuth);
		
		const tootTipProps = {
      		show: this.props.nbTryAuth>0,
      		target: () => ReactDOM.findDOMNode(this.refs.submitButton)
    	};
    	
		return(
		<Form horizontal onSubmit={this.handleSubmit}>
			<FormGroup controlId="formHorizontalLogin" validationState={this.secondTry()}>
			<Col componentClass={ControlLabel} sm={2}>
			  Login
			</Col>
			<Col sm={5}>
			  <FormControl 
			  	type="text" 
			  	placeholder="Email" 
			  	onChange={this.handleLoginChange}/>
			</Col>
		    </FormGroup>
		
		    <FormGroup controlId="formHorizontalPassword" validationState={this.secondTry()}>
			<Col componentClass={ControlLabel} sm={2}>
			  Password
			</Col>
			<Col sm={5}>
			  <FormControl 
			  	type="password" 
			  	placeholder="Password" 
			  	onChange={this.handlePasswordChange}/>
			</Col>
		    </FormGroup>
		
		    <FormGroup>
			<Col smOffset={2} sm={10}>
			
			  <Button ref="submitButton" type="submit">
			    Sign in
			  </Button>
			  
        	  <Overlay {...tootTipProps} placement="right">
          		<Tooltip id="overload-right" bsStyle="error"><strong>User/password not found!</strong></Tooltip>
        	  </Overlay>
        
			</Col>
		    </FormGroup>
		</Form>
		);
	}
});


module.exports = LoginForm;