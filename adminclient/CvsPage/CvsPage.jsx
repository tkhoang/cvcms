import React from 'react';
import T from 'i18n-react'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LeftMenu } from '../LeftMenu';
import { cvsActions } from '../_actions';

class CvsPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      showNewCvPopin: false,
      cvname: '',
      cvdesc: '',
      submitted: false
    }; 
    this.openNewForm = this.openNewForm.bind(this);
    this.closeNewForm = this.closeNewForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(cvsActions.getAll());
  }

  openNewForm (e){
    e.preventDefault();
    this.setState({ showNewCvPopin: true});
  }

  closeNewForm (e){
    e.preventDefault();
    this.setState({ showNewCvPopin: false});
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { cvname, cvdesc } = this.state;
    const { dispatch, cvs } = this.props;
    if (cvname) {
      this.props.dispatch(cvsActions.addCv(cvname, cvdesc, cvs));
      this.setState({showNewCvPopin:this.props.showNewCvPopin });
    }
  }

  handleDelete(id) {
    const { cvdesc } = this.state;
    return (e) => this.props.dispatch(cvsActions.deleteCv(id));
  }

  render() {
    T.setTexts( require('../en.yml'));
    const {cvs} = this.props;
    const {showNewCvPopin, cvname, cvdesc, submitted} = this.state;
    return (
      <div>
        {showNewCvPopin &&
          <div className="overlay">
            <div className="popup">
              <T.text tag='h2' text={{key: "CvFormHeaderLabel" }}/>
                <a className="close" onClick={this.closeNewForm}>&times;</a>
                <div className="content">
                  <form name="form" onSubmit={this.handleSubmit}>
                    <T.text tag='label' 
                      text={{key: "CvFormNameLabel" }}/>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="cvname" 
                      value={cvname} 
                      onChange={this.handleChange} />
                    {submitted && !cvname &&
                      <div className="help-block">
                        <T.p text={{key: "CvFormNameMessage"}}/>
                      </div>
                    }
                    <T.text tag='label' 
                      text={{key: "CvFormDescLabel" }}/>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="cvdesc" 
                      value={cvdesc} 
                      onChange={this.handleChange} />
                    <br/>
                    <T.button 
                      text={{ key: "CvButtonAdd"}} 
                      className="btn btn-primary"/>
                  </form>
                </div>
              </div>
            </div>
        }
        <LeftMenu/>
        <div className="container">
          <div className="HeaderLabel">
            <T.p text={{ key: "CvListHeadMessage"}} />
            <T.button 
              text={{ key: "CvButtonNew" }} 
              className="btn btn-lg btn-default" 
              onClick={this.openNewForm}/>
          </div>
          {cvs.items && cvs.items.map((cv, index) =>
            <div className="row">
              <div className="col-md3">
                <div className="card">
                  <div className="card-body">
                    {cv.title} 
                    <br/>
                    { cv.deleting 
                        ? <T.text tag='em' text={{ key: "CvDeleting"}} />
                      : cv.deleteError 
                        ? <div>
                            <span className="text-danger"> {cv.deleteError}</span>
                            <T.a text={{ key: "CvDelete"  }}
                              onClick={this.handleDelete(cv.id)}
                              className="alert-link"
                            />
                          </div>
                      : <T.a text={{ key: "CvDelete"  }} 
                          onClick={this.handleDelete(cv.id)}
                          className="alert-link"
                        />
                    }
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { cvs } = state;
  return {
    cvs
  };
}

const connectedCvsPage = connect(mapStateToProps)(CvsPage);
export { connectedCvsPage as CvsPage };
