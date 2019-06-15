import React from 'react';

function HeaderUnauthorized(props) {
    return (
            <span className="navbar-item">
              <div className="button is-primary" onClick={props.handleClick}>
                <span className="icon">
                  <i className="fas fa-user"></i>
                </span>
                <span>Log In</span>
              </div>
            </span>
    );
}

export default HeaderUnauthorized;
