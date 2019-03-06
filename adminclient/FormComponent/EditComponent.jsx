import React from 'react';
import T from 'i18n-react'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class EditComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = 
    {
      value: this.props.entryValue
    }    
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({ value: value });
  }

  handleBlur(e) {
    this.props.onSubmit(this.props.id, this.props.field.entryName, this.state.value);
  }

  render(){
    
    const {value} = this.state;
    return (
      <input 
        type="text" 
        className="" 
        autoFocus={true}
        onBlur={this.handleBlur}  
        onChange={this.handleChange} 
        value={value}
      />
    )
  }
}
function mapStateToProps(state) {
  const { } = state;
  return {

  };
}

const connectedEditComponent = connect(mapStateToProps)(EditComponent);
export { connectedEditComponent as EditComponent };
