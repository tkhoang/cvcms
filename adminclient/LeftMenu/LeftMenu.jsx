import React from 'react';
import T from 'i18n-react'; 
import BurgerMenu from 'react-burger-menu';
import { Link } from 'react-router-dom';

class LeftMenu extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hidden: false
    };
  }

  showSettings (event) {
    event.preventDefault();
  }

  render () {
    const Menu = BurgerMenu['slide'];
    T.setTexts( require('../en.yml'));
    return (
      <div>
        <Menu  id='slide' pageWrapId={'page-wrap'} outerContainerId={'container'} >
          <a id="home" className="menu-item" href="/">Home</a>
          <Link className="menu-item" to={`/admin/cvs`}><T.p text={{ key: "MyCvs"}} /></Link>
        </Menu>
      </div>
    );
  }
}

export { LeftMenu as LeftMenu };
