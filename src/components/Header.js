import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Auth from './Auth'
class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthHidden: true
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    this.setState({isAuthHidden: !this.state.isAuthHidden});
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
                  <span className="icon">
                    <i className="fas fa-search"></i>
                  </span>
                  <span>Search</span>
                </Link>
                <span className="navbar-item">
                  <div className="button is-primary is-inverted" onClick={this.handleClick}>
                    <span className="icon">
                      <i className="fas fa-user"></i>
                    </span>
                    <span>Log In</span>
                  </div>
                </span>
              </div>
            </div>
            <Auth isHidden={this.state.isAuthHidden} />
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
