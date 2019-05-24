import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class HeaderAuthorized extends Component {
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
              <span className="icon is-large has-text-danger">
                <i className="fas fa-heart fa-2x"></i>
              </span>
              <span className="navbar-burger burger" data-target="navbarMenuHeroA">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenuHeroA" className="navbar-menu">
              <div className="navbar-end">
                <Link to="/" className="navbar-item is-active">
                  <span className="icon has-text-primary">
                    <i className="fas fa-home"></i>
                  </span>
                  <span>Home</span>
                </Link>
                <Link to="search" className="navbar-item">
                  <span className="icon has-text-info">
                    <i className="fas fa-search "></i>
                  </span>
                  <span>Search</span>
                </Link>
                <Link to="favorites" className="navbar-item">
                  <span className="icon has-text-star">
                    <i className="fas fa-star "></i>
                  </span>
                  <span>Favorites</span>
                </Link>
                <span className="navbar-item">
                  <div className="button is-primary is-inverted" onClick={this.handleClick}>
                    <span className="icon">
                      <i className="fas fa-user"></i>
                    </span>
                    <span>{this.props.name}</span>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default HeaderAuthorized;
