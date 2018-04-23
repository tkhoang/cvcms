import { cvsConstants} from '../_constants';
import { cvsService } from '../_services';
//import { alertActions } from './';
import { history } from '../_helpers';
 
export const cvsActions = {
  getAll,
  addCv,
  deleteCv
};
 
 
function getAll() {
  return dispatch => {
    console.log(cvsConstants);
    dispatch(request());
 
    cvsService.getAll()
      .then(
        cvs => dispatch(success(cvs)),
        error => {
          dispatch(failure(error));
         // dispatch(alertActions.error(error))
        }
      );
  };
 
  function request() { return { type: cvsConstants.GETALL_REQUEST} }
  function success(cvs) { return { type: cvsConstants.GETALL_SUCCESS, cvs } }
  function failure(error) { return { type: cvsConstants.GETALL_FAILURE, error } }
}
 
function addCv(cvname, cvdesc, cvs) {
  return dispatch => {
    dispatch(request());

    cvsService.addCv(cvname)
      .then(
        response => {
          dispatch(success(response.data))
        },
        error => {
          dispatch(failure(error));
        }
      );
  };
  
  function request() { return { type: cvsConstants.ADD_REQUEST} }
  function success(cv) { return { type: cvsConstants.ADD_SUCCESS, cv } }
  function failure(error) { return { type: cvsConstants.ADD_FAILURE, error } }
}

function deleteCv(id){
  return dispatch => {
    dispatch(request(id));

    cvsService.deleteCv(id)
      .then(  
        response => {
          dispatch(success(id))
        },
        error => {
          dispatch(failure(error.message))
        }
    );
  }

  function request(id) { return { type: cvsConstants.DELETE_REQUEST, id} }
  function success(id) { return { type: cvsConstants.DELETE_SUCCESS, id} }
  function failure(error) { return { type: cvsConstants.DELETE_FAILURE,id, error } }
}
