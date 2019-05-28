import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class HeaderAuthorized extends Component {
  render() {
    return (
            <div className="auth-header">
              <div className="navbar-item auth-header__item">
              <Link to="favorites" className="button menu">
                <span className="icon has-text-star">
                  <i className="fas fa-star "></i>
                </span>
                <span>Favorites</span>
              </Link>
            </div>
            <span className="navbar-item auth-header__item">
              <div className="button is-primary is-inverted" onClick={this.props.handleClick}>
                <span className="icon">
                  <i className="fas fa-user"></i>
                </span>
                <span>{this.props.name}</span>
              </div>
            </span>
          </div>

    );
  }
}

export default HeaderAuthorized;
