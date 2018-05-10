import { cvConstants } from '../_constants';

const initialState = {};

export function cv(state = {}, action) {
  switch (action.type) {
  case cvConstants.ACTION_REQUEST:
    return {
    loading: true
    };
  case cvConstants.ACTION_SUCCESS:
    return {
    data: action.cv
    };
  case cvConstants.ACTION_FAILURE:
    return {
    error: action.error
    };
  case cvConstants.ACTION_EDIT:
    return {
      console.log('reducer');
      edit: action.edit
    };
  default:
    return state
  }
}
