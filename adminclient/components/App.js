import React from 'react';
import {Link} from 'react-router';

class App extends React.Component{ 
  render() {
    const { count, dispatch } = this.props;
    return (
      <div>
        <h1>Demo...</h1>
        <Link to={`/admin/login`} >lien </Link>
      </div>
    );
  }
};

export default App;
