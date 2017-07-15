import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
//import { resetErrorMessage } from '../actions'


class App extends Component {
	
	render() {
	  
	console.log('Rendering app')
    return (
      <div>  
		<h1> Yo </h1>
		<Link to="/login">login</Link>
		
      </div>
    )
  }
  
}


const mapStateToProps = (state, ownProps) => ({
  //errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.substring(1)
})

//*
export default connect(mapStateToProps, {
  //resetErrorMessage
})(App)
//*/
