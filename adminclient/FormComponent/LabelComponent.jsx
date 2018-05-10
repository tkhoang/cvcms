import React from 'react';
import T from 'i18n-react'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { cvActions } from '../_actions';

class LabelComponent extends React.Component{
  constructor(props){
    super(props)
    
    this.state = {
      editing : false
    }
    this.handleEditEntry = this.handleEditEntry.bind(this);
  }

  handleEditEntry (){
    console.log('onclick!', this.props)
    this.props.dispatch(cvActions.edit(1));
  }

  render(){
    return (
      <span onClick={this.handleEditEntry}>
        {this.props.entryValue} 
      </span>
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
