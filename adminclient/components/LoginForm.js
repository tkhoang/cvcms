//LoginForm

import React, { PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as sessionActions from '../actions/sessionActions';

class LoginForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {credentials: {username: '',password:''}};
    this.handleSubmit = this.handleSubmit.bind(this);  
    this.handleChange = this.handleChange.bind(this);  
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.actions.loginUser(this.state.credentials);
  }

  handleChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials [field] = event.target.value;
    this.setState({credentials: credentials});
  }

  render(){
    console.log('this props');
    console.log(this.props);
    const  errorMessage  = this.props.errorMessage ;
    return (
        <div className="loginForm">
          Welcome.
          <form  onSubmit={this.handleSubmit}>
            <input 
              type="text" 
              name="username"
              value={this.state.credentials.email}
              onChange={this.handleChange} />
            <input 
              type="password" 
              name="password"
              value={this.state.credentials.password}
              onChange={this.handleChange} />
            <input type="submit" name="submit"/>
        </form>
        {errorMessage ? <p>{errorMessage}</p> : null} 
        </div>
        )
  }
}

function mapDispatchToProps (dispatch){
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect (null, mapDispatchToProps)(LoginForm);
