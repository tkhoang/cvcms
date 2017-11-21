import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LeftMenu } from '../LeftMenu';
 
import { userActions } from '../_actions';
 
class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }
 
 
  render() {
    const { user, users } = this.props;
    return (
      <div>
        <LeftMenu/>
        <div className="container"> 
            logged as :{user.firstName}
            <p>You are logged in with React!!</p>
        </div>
      </div>
    );
  }
}
 
function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}
 
const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
