import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import userActions from '../actions/user-action';
import infoActions from '../actions/info-action';

class Registration extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      name: '',
      password: '',
      password_check: '',
      passwords_equal: false,
      password_min_length: false,
      username_min_length: false,
      canRegister: false,
      user_unique: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkUser = this.checkUser.bind(this);
    this.errorsMessages = this.errorsMessages.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    //console.log(1);
    if(!(this.state.password_min_length && this.state.passwords_equal && this.state.username_min_length && this.state.user_unique))
      return;

    this.props.signUpUser(this.state.name, this.state.password);

    this.props.authUser(this.state.name);
    this.props.welcomeUser(this.state.name);

    sessionStorage.setItem('user', this.state.name);
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
    this.setState({[event.target.name]: event.target.value}, function(){

          if(this.state.name.length > 3) {
            this.setState({username_min_length: true});
          } else if (this.state.username_min_length === true) {
            this.setState({username_min_length: false});
          }

          if(this.props.users[this.state.name]) {
            this.setState({user_unique: false});
          } else {
            this.setState({user_unique: true});
          }

          if((this.state.password.length > 5) && (this.state.password === this.state.password_check)) {
            this.setState({password_min_length: true, passwords_equal: true});
          } else if (this.state.password.length > 5) {
            this.setState({password_min_length: true, passwords_equal: false});
          } else if (this.state.password.length <= 5 && this.state.password !== this.state.password_check ) {
            this.setState({password_min_length: false, passwords_equal: false});
          }
          if( this.state.username_min_length && this.state.user_unique &&
            this.state.password_min_length && this.state.passwords_equal) {
              console.log(this.state.username_min_length , this.state.user_unique ,
                this.state.password_min_length , this.state.passwords_equal);
            this.setState({canRegister: true});
          } else {
            console.log(this.state.username_min_length , this.state.user_unique ,
              this.state.password_min_length , this.state.passwords_equal);
            this.setState({canRegister: false});
          }
    });
    
  }

  errorsMessages(){
    let validation_message = [];
    let className = 'error';
    if (this.state.username_min_length){
      className = 'pass';
    }
    validation_message.push(<div key="1" className={className}> Name has at list 4 letters</div>);
    className = 'error';

    if (this.state.user_unique){
      className = 'pass';
    }
    
    validation_message.push(<div key="2" className={className}> Username is unique</div>);
    className = 'error';

    if (this.state.password_min_length){
      className = 'pass';
    }
    
    validation_message.push(<div key="3" className={className}> Password has at list 6 letters</div>);
    className = 'error';
    if (this.state.passwords_equal){
      className = 'pass';
    }
    validation_message.push(<div key="4" className={className}> The password and confirmation password match.</div>);
    return validation_message;
  }

  render() {
    let errors = this.errorsMessages();
    let disable = (this.state.canRegister) ? 'enable' : 'disabled';
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
    authUser: (user) => dispatch(userActions.authUser(user)),
    signUpUser:  (user, password) => dispatch(userActions.signUpUser(user, password)),
    welcomeUser: (name) => dispatch(infoActions.welcomeUser(name))
  };
}

const mapStateToProps = store => ({ users: store.users.user});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Registration));
