import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { experience } from './experience.reducer';
import { cvs } from './cvs.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  experience,
  cvs
});

export default rootReducer;
