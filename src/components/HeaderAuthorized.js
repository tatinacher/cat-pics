import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Dropdown from './Dropdown'

class HeaderAuthorized extends Component {
  render() {
    return (
            <span className="navbar-item">
              <div className="button is-primary is-inverted" onClick={this.props.handleClick}>
                <span className="icon">
                  <i className="fas fa-user"></i>
                </span>
                <span>{this.props.name}</span>
              </div>
            </span>
    );
  }
}

export default HeaderAuthorized;
