import React, { Component } from 'react';
import HeaderAuthorized from './HeaderAuthorized';
import HeaderUnauthorized from './HeaderUnauthorized';
class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: ''
    }
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logIn(name) {
    this.setState({username: name});
  }

  logOut() {
    console.log(1);
    sessionStorage.removeItem('user');
    this.setState({username: ''});
  }


  render() {
    if (this.props.checkLogin()){
      return(
        <HeaderAuthorized name={this.state.username} logOut={this.logOut} />
      );
    } else {
      return(
        <HeaderUnauthorized logIn={this.logIn} />
      );
    }
  }
}

export default Header;
