import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import userActions from '../actions/user-action';
import infoActions from '../actions/info-action';
import {Link} from 'react-router-dom';

class Auth extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      name: '',
      password: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let username = this.state.name;
    let users = this.props.users;

    if (users[username] && users[username].password === this.state.password) {
      this.props.authUser(username);
      this.props.welcomeUser(username);
      this.props.closeMenu();
      sessionStorage.setItem('user', 'user');
    } else {
      this.props.invalidAuthData();
    }
  }
  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <form className={this.props.isHidden ? "auth-form is-hidden" : "auth-form"} onSubmit={this.handleSubmit}>
        <div className="dropdown-caret right"> 
          <span className="caret-outer"></span> 
          <span className="caret-inner"></span> 
        </div>
        <div className="button-close" onClick={this.props.closeDropdown}></div>
        <div className="field">
          <label className="label is-small">Username</label>
          <div className="control">
            <input className="input" type="text" name="name" placeholder="e.g catlover" onChange={this.handleChange} />
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Password</label>
          <div className="control">
            <input className="input" name="password" type="password" onChange={this.handleChange} />
          </div>
        </div>
        <div className="field">
          <button className="button is-link is-fullwidth">Sign In</button>
        </div>
        <div className="field auth">
          <Link to='sign-up'>Sign Up</Link>
        </div>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authUser: (user) => dispatch(userActions.authUser(user)),
    invalidAuthData: () => dispatch(infoActions.invalidAuthData()),
    welcomeUser: (name) => dispatch(infoActions.welcomeUser(name))
  };
}

const mapStateToProps = store => ({ users: store.users.user});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
