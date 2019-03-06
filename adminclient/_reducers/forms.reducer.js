import { formsConstants } from '../_constants';

const initialState = {list : []};

export function forms(state = initialState, action) {
  switch (action.type) {
  case formsConstants.ACTION_EDIT:
    var list = state.list
    list = list.map( page => 
      page.id == action.page
      ? {...page, sections: page.sections.map ( section =>
          section.id == action.section
          ? {...section, fields:section.fields.map( field =>
              field.entryName == action.key
              ? {...field, editing:true}
              : field
            )} 
          : section
        )} 
      : page 
    )
    return {
       list
    };
  case formsConstants.ACTION_REQUEST:
    var list = state.list
    list = list.map( page =>
      page.id == action.page
      ? {...page, sections: page.sections.map ( section =>
          section.id == action.section
          ? {...section, fields:section.fields.map( field =>
              field.entryName == action.key
              ? {...field, calling:true}
              : field
            )}
          : section
        )}
      : page
    )
    return {
       list
    };
  case formsConstants.ACTION_SUCCESS:
    var list = state.list
    list = list.map( page =>
      page.id == action.page
      ? {...page, sections: page.sections.map ( section =>
          section.id == action.section
          ? {...section, fields:section.fields.map( field =>
              field.entryName == action.key
              ? {...field, calling:false,editing:false}
              : field
            )}
          : section
        )}
      : page
    )
    return {
       list
    };
  case formsConstants.ACTION_FAILURE:
    var list = state.list
    list = list.map( page =>
      page.id == action.page
      ? {...page, sections: page.sections.map ( section =>
          section.id == action.section
          ? {...section, fields:section.fields.map( field =>
              field.entryName == action.key
              ? {...field, calling:false,editing:true}
              : field
            )}
          : section
        )}
      : page
    )
    return {
       list
    };
  case formsConstants.ACTION_INIT:
    list = state.list;
    list.push(action.forms);
    return {
       list:list
    };
  default:
    return state
  }
}
