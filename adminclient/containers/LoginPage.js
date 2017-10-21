import React,{ PropTypes } from 'react'
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';

class LoginPage extends React.Component {
 
  constructor(props) {
    super(props);

    this.state = {
       errors: {},
       user: {
         email: '',
         password: ''
       }
     }
   }

   render() {
     return (
       <LoginForm
          errors={this.state.errors}
          user={this.state.user}
        />
       );
   }
}

export default LoginPage
