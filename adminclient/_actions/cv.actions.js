import { cvConstants} from '../_constants';
import { cvService } from '../_services';
import { history } from '../_helpers';
 
export const cvActions = {
  getCv,
  edit
};
 
 
function getCv(id) {
  return dispatch => {
    dispatch(request());
 
    cvService.getCv(id)
      .then(
        cv => dispatch(success(cv)),
        error => {
          dispatch(failure(error));
        }
      );
  };
 
  function request() { return { type: cvConstants.ACTION_REQUEST} }
  function success(cv) { return { type: cvConstants.ACTION_SUCCESS, cv } }
  function failure(error) { return { type: cvConstants.ACTION_FAILURE, error } }
}
 
function edit(key) {
  return dispatch => {
    console.log('edit');
    dispatch(edit());
  };
 
  function edit() { return { type: cvConstants.ACTION_EDIT} }
}
