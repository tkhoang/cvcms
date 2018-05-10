import React from 'react';
import T from 'i18n-react'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LabelComponent } from '.';

class FormComponent extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    T.setTexts( require('../en.yml'));
    return (
      <div>
        {this.props.formParams.fields && 
         this.props.formEntries &&
         this.props.formParams.fields.map((field, index) =>
          <div key={field.entryName}>
            <span>
              <T.text tag='label' 
                text={{key: field.entryTrad }}/>
            </span>
            <LabelComponent 
              entryValue={this.props.formEntries[field.entryName]} 
            />
          </div>
        )}
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { } = state;
  return {

  };
}

const connectedFormComponent = connect(mapStateToProps)(FormComponent);
export { connectedFormComponent as FormComponent };
