//import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';

export default function sessionReducer(state = initialState , action) {
  switch(action.type) {
    case 'LOGED_IN' :
      console.log('reducer LOGGED IN');
      //browserHistory.push('/admin')
      //return !!localStorage.token; 
      return Object.assign({},state, {loggedIn:true,shouldRedirect:true})
    case 'LOGIN_OUT' :
      //browserHistory.push('/admin/login')
      return {test}; 
    case 'LOGIN_ERROR':
      console.log(action.message);
      return Object.assign({}, state, { loggedIn: false, shouldRedirect: false, errorMessage: action.message });
  }
  return state
}
