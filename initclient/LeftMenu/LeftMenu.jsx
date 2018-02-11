import React from 'react';
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
    return (
      <div>
        <Menu  id='slide' pageWrapId={'page-wrap'} outerContainerId={'container'} >
          <a id="home" className="menu-item" href="/">Home</a>
          <Link className="menu-item" to={`/admin/experiences`}>Experiences</Link>
          <a id="contact" className="menu-item" href="/contact">Contact</a>
        </Menu>
      </div>
    );
  }
}

export { LeftMenu as LeftMenu };
