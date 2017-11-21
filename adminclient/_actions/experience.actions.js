import { experienceConstants} from '../_constants';
import { experienceService } from '../_services';
//import { alertActions } from './';
import { history } from '../_helpers';
 
export const experienceActions = {
  getAll
};
 
 
function getAll() {
  return dispatch => {
    console.log(experienceConstants);
    dispatch(request());
 
    experienceService.getAll()
      .then(
        experiences => dispatch(success(experiences)),
        error => {
          dispatch(failure(error));
         // dispatch(alertActions.error(error))
        }
      );
  };
 
  function request() { return { type: experienceConstants.GETALL_REQUEST} }
  function success(experiences) { return { type: experienceConstants.GETALL_SUCCESS, experiences } }
  function failure(error) { return { type: experienceConstants.GETALL_FAILURE, error } }
}
 

