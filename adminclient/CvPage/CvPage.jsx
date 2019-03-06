import React from 'react';
import T from 'i18n-react'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LeftMenu } from '../LeftMenu';
import { FormComponent } from '../FormComponent';
import { cvActions } from '../_actions';
import { formsActions } from '../_actions';
import { cvForms } from './cv.form';

class CvPage extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      id: props.match.params.id
      //titlesection: titlesection
    }; 
  }

  componentDidMount() {
    console.log(this)
    this.props.dispatch(cvActions.getCv(this.state.id));
    this.props.dispatch(formsActions.init(cvForms));
  }

  render() {
    T.setTexts( require('../en.yml'));
    const { cv, forms } = this.props;
    var titlesection, infosection;
    if (forms.list){
    titlesection = forms
                     .list
                     .find(page => page.id == 'cv' )
                     .sections.find(section => section.id == 'titlesection' );
    infosection = forms
                     .list
                     .find(page => page.id == 'cv' )
                     .sections.find(section => section.id == 'infosection' );
    }
    return (
      <div>
        <LeftMenu/> 
          <div className="container">
            { cv && forms.list &&
              <div>
              <FormComponent 
                formParams={titlesection}
                formEntries={cv.data}
                uniqueId={true}
              />
              <FormComponent 
                formParams={infosection}
                formEntries={cv.data.infos}
                uniqueId={false}
                parentId={cv.data.id}
              />
              </div>
            }
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {cv,forms} = state;
  return {
    cv,
    forms
  };
}

const connectedCvPage = connect(mapStateToProps)(CvPage);
export { connectedCvPage as CvPage };
