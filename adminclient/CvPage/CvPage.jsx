import React from 'react';
import T from 'i18n-react'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LeftMenu } from '../LeftMenu';
import { FormComponent } from '../FormComponent';
import { cvActions } from '../_actions';
import { titlesection } from './cv.title.form';

class CvPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      id: props.match.params.id
    }; 
    this.handleChange = this.handleChange.bind(this);
    this.functionName = this.functionName.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(cvActions.getCv(this.state.id));
  }

  functionName (e){
    e.preventDefault();
    this.setState({ stateVariable: true});
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    T.setTexts( require('../en.yml'));
    const { cv } = this.props;
    const {} = this.state;
    return (
      <div>
        <LeftMenu/> 
          <div className="container">
            { cv &&
              <FormComponent 
                formParams={titlesection}
                formEntries={cv.data}
              />
            }
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {cv} = state;
  return {
    cv
  };
}

const connectedCvPage = connect(mapStateToProps)(CvPage);
export { connectedCvPage as CvPage };
