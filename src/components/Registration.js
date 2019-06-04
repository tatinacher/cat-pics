import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import userActions from '../actions/user-action';

class Registration extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      name: '',
      password: '',
      password_check: '',
      logIn: false,
      password_error: false,
      password_length_error: false,
      username_length_error: false,
      name_starts_with_letter: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkUser = this.checkUser.bind(this);
    this.errorsMessages = this.errorsMessages.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.checkUser()){
      // ib user error
      this.setState({username_length_error: true})
      return;
    }

    if (!this.checkPassword()){
      //ib password error
      this.setState({username_error: false, password_error: true})
      return;
    }

    console.log(1)

    this.props.signUpUser(this.state.user, this.state.password);

    this.props.authUser(this.state.username);
    this.props.welcomeUser(this.state.username);

    sessionStorage.setItem('user', this.state.username);
    // ib hello user
    this.props.history.push('/');
  }

  checkUser(){
    if (this.state.name === '')
      return false;
    return true;
  }

  checkPassword(){
    const pass = this.state.password;
    if (pass === '' || pass.length < 6)
      return false;
    return pass === this.state.password_check;
  }
  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    if(this.state.name.length > 3) {
      this.setState({username_length_error: true});
    } else if (this.state.username_length_error === true) {
      this.setState({username_length_error: false});
    }
  }

  errorsMessages(){
    let validation_message = [];
    let className = 'error';
    if (this.state.name_starts_with_letter){
      className = 'pass';
    }
    validation_message.push(<div key="0" className={className}> Name starts with letter</div>);
    className = 'error';

    if (this.state.username_length_error){
      className = 'pass';
    }
    validation_message.push(<div key="1" className={className}> Name has at list 4 letters</div>);
    className = 'error';

    if (this.state.password_length_error){
      className = 'pass';
    }
    
    validation_message.push(<div key="2" className={className}> Password has at list 4 letters</div>);
    className = 'error';
    if (this.state.password_error){
      className = 'pass';
    }
    validation_message.push(<div key="3" className={className}> The password and confirmation password match.</div>);
    return validation_message;
  }

  render() {
    let errors = this.errorsMessages();
    return (
      <div className="registration">
        <h1 className="title">Registration</h1>
        <form onSubmit={this.handleSubmit} className="container sign-up-form">
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
            <label className="label is-small">Password</label>
            <div className="control">
              <input className="input" name="password_check" type="password" onChange={this.handleChange} />
            </div>
          </div>
          <div className="field">
            <button className="button is-link is-fullwidth">Register</button>
          </div>
          <div className="field">{errors}</div>
        </form>
      </div>
      
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authUser: (user) => dispatch(userActions.authUser(user))
  };
}

const mapStateToProps = store => ({ users: store.users.user});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Registration));
