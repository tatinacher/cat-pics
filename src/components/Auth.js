import React, { Component } from 'react';

class Auth extends Component {
  render() {
    return (
      <form className={this.props.isHidden ? "auth-form is-hidden" : "auth-form"}>
        <div className="dropdown-caret right"> 
          <span className="caret-outer"></span> 
          <span className="caret-inner"></span> 
        </div>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" placeholder="e.g catlover"/>
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" />
          </div>
        </div>
        <div className="field">
          <button className="button is-link is-fullwidth">Log In</button>
        </div>
      </form>
    );
  }
}

export default Auth;
