import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      plant: [],
    }
  }

  render() {
    return (
      <div className="hero-head">
        <nav className="navbar has-shadow is-spaced">
          <div className="container">
            <div className="navbar-brand">
              <span className="navbar-burger burger" data-target="navbarMenuHeroA">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenuHeroA" className="navbar-menu">
              <div className="navbar-end">
                <Link to="/" className="navbar-item is-active">
                  <span className="icon">
                    <i className="fas fa-home"></i>
                  </span>
                  <span>Home</span>
                </Link>
                <Link to="search" className="navbar-item">
                  Search
                </Link>
                <span className="navbar-item">
                  <Link to="/" className="button is-primary is-inverted">
                    <span className="icon">
                      <i className="fab fa-github"></i>
                    </span>
                    <span>Download</span>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
