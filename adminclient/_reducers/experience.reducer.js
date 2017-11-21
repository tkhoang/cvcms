import { experienceConstants } from '../_constants';
 
const initialState = {};

export function experiences(state = {}, action) {
  switch (action.type) {
  case experienceConstants.GETALL_REQUEST:
    return {
    loading: true
    };
  case experienceConstants.GETALL_SUCCESS:
    return {
    items: action.experiences
    };
  case experienceConstants.GETALL_FAILURE:
    return {
    error: action.error
    };
  default:
    return state
  }
}
