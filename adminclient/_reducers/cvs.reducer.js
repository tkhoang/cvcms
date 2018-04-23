import { cvsConstants } from '../_constants';
 
const initialState = {};

export function cvs(state = {}, action) {
  switch (action.type) {
  case cvsConstants.GETALL_REQUEST:
    return {
    loading: true
    };
  case cvsConstants.GETALL_SUCCESS:
    return {
    items: action.cvs
    };
  case cvsConstants.GETALL_FAILURE:
    return {
    error: action.error
    };
  case cvsConstants.ADD_SUCCESS:
    var cvs = state.items;;
    cvs.push(action.cv);
    return {
    showNewCvPopin: false,
    items: cvs
    };
  case cvsConstants.ADD_FAILURE:
    return {
    error: action.error
    };
  case cvsConstants.DELETE_REQUEST:
    return {
      ...state,
      items: state.items.map(cv =>
        cv.id === action.id
          ?{...cv, deleting: true}
          : cv
        )
    };
  case cvsConstants.DELETE_SUCCESS:
    return {
    items: state.items.filter(cv => cv.id !== action.id)
    };
  case cvsConstants.DELETE_FAILURE:
    return {
      ...state,
      items: state.items.map(cv => {
        if(cv.id === action.id){
          const {deleting, ...cvCopy} = cv;
          return {...cvCopy, deleteError: action.error };
        }
        return cv;
      })
    };
  default:
    return state
  }
}
