import React from 'react';
import { Link } from 'react-router-dom';
import T from 'i18n-react'; 
import { connect } from 'react-redux';
import { userActions } from '../_actions';
 
class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        password: '',
        email: ''
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  } 
 
  handleChange(e) {
    const { name, value } = e.target;
    const { user } = this.state; 
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }
 
  handleSubmit(e) {
    e.preventDefault();
 
    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.username && user.password && user.email) {
      dispatch(userActions.register(user));
    }
  }

  render() {
    T.setTexts( require('../en.yml'));
    const {  registered, registering } = this.props;
    console.log('registering:', registering, 'registered', registered);
    const { user, submitted } = this.state;
    if (!registered)
    return (
      <div>
        <div className="container"> 
          <div className="col-sm-8 col-sm-offset-2">
            <div className="col-md-6 col-md-offset-3">
              <h2>
                <T.p text={{ key: "welcome"}} />
              </h2>
              <form name="form" onSubmit={this.handleSubmit}>
              <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                <label htmlFor="username">Username</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="username" value={user.username} onChange={this.handleChange} 
                />
                {submitted && !user.username &&
                  <div className="help-block">Username is required</div>
                }
                </div>
                <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                  <label htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    name="password" value={user.password} onChange={this.handleChange} 
                  />
                  {submitted && !user.password &&
                     <div className="help-block">Password is required</div>
                  }
                  <label htmlFor="email">Email</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="email" 
                    value={user.email} 
                    onChange={this.handleChange} 
                  />
                  {submitted && !user.email &&
                  <div className="help-block">Email is required</div>
                   }
                </div>
                <div className="form-group">
                  <button className="btn btn-primary">Register</button>
                    {registering &&
                      <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    } 
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
    else
      return (
        <div>
          <div className="container">
            <div className="col-sm-8 col-sm-offset-2">
              <div className="col-md-6 col-md-offset-3">
                <T.p text={{ key: "registered", who: user.username}} />
                <a href="/admin/" className="btn btn-link">Admin</a>
              </div>
            </div>
          </div>
        </div>
      )
  }
}
 
function mapStateToProps(state) {
  const { registering } = state.registration;
  const { registered } = state.registration;
  return {
    registering,
    registered
  };
}
 
const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
