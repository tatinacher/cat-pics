import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { withRouter } from "react-router";

class HeaderAuthorized extends Component {
  render() {
    const name = this.props.name || '';
    if (name === '') return null;
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
const mapStateToProps = store => ({ name: store.users.activeUser});

export default withRouter(connect(mapStateToProps)(HeaderAuthorized));