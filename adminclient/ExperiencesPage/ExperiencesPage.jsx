import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LeftMenu } from '../LeftMenu';
import { experienceActions } from '../_actions';

class ExperiencesPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(experienceActions.getAll());
  }

  render() {
    return (
      <div>
        <LeftMenu/>
        <div className="container">
          test
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { experiences } = state;
  return {
    experiences
  };
}

const connectedExperiencesPage = connect(mapStateToProps)(ExperiencesPage);
export { connectedExperiencesPage as ExperiencesPage };
