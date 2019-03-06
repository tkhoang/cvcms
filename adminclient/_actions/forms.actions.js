import { formsConstants} from '../_constants';
import { history } from '../_helpers';
import { alertActions } from './';
import { crudService } from '../_services';
export const formsActions = {
  init,
  edit,
  update
};
 
 
function init(forms) {
  return dispatch => {
    dispatch(init(forms));
  };
 
  function init(forms) { 
    return { type: formsConstants.ACTION_INIT, forms } 
  }
}
 
function edit(page, section, key) {
  return dispatch => {
    dispatch(edit(page, section, key));
  };
  
  function edit(page, section, key) { 
    return { type: formsConstants.ACTION_EDIT, page, section, key } 
  }
}
function update(uniqueId, page, section,api,id, key, value, lang, parentId, callback) {
    return dispatch => {
      dispatch(request(page, section, key));
       
        if(id){
          crudService.put(api+id,{[uniqueId?key:"value"]:value})
          .then(
            res=>{
              callback(id,key,value);
              dispatch(success(page, section, key));
              dispatch(alertActions.clear());
            },
            error=>{
              dispatch(failure(page,section,key));
              dispatch(alertActions.error(error));
            }
          )  
        }else{
          crudService.post(api,{"value":value, "language":lang, "cv_id": parentId,"key": key})
          .then(
            res=>{
              callback(res.data.id,key,value,true);
              dispatch(success(page, section, key));
              dispatch(alertActions.clear());
            },
            error=>{
              dispatch(failure(page,section,key));
              dispatch(alertActions.error(error));
            }
          )  
        }
    }
  function request (page, section, key){
    return {type: formsConstants.ACTION_REQUEST, page, section, key }
  }
  function success(){
    return {type: formsConstants.ACTION_SUCCESS, page, section, key} 
  }
  function failure(){
    return {type: formsConstants.ACTION_FAILURE, page, section, key} 
  }
}
