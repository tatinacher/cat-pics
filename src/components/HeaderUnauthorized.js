import React, { Component } from 'react';

class HeaderUnauthorized extends Component {
  render() {
    return (
            <span className="navbar-item">
              <div className="button is-primary" onClick={this.props.handleClick}>
                <span className="icon">
                  <i className="fas fa-user"></i>
                </span>
                <span>Log In</span>
              </div>
            </span>
    );
  }
}

export default HeaderUnauthorized;
