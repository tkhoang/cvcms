import React from 'react';
import T from 'i18n-react'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class LabelComponent extends React.Component{
  constructor(props){
    super(props)
    
  }


  render(){
    return (
      <div  className="disable-form" onClick={this.props.onClick}  >
          {this.props.entryValue}
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { } = state;
  return {

  };
}

const connectedLabelComponent = connect(mapStateToProps)(LabelComponent);
export { connectedLabelComponent as LabelComponent };
