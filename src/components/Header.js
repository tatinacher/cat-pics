import React, { Component } from 'react';
import HeaderAuthorized from './HeaderAuthorized';
import HeaderUnauthorized from './HeaderUnauthorized';
class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: ''
    }
    this.authorize = this.authorize.bind(this);
  }

  authorize(name) {
    this.setState({username: name});
  }

  render() {
    if (this.props.checkLogin()){
      return(
        <HeaderAuthorized name={this.state.username} />
      );
    } else {
      return(
        <HeaderUnauthorized authorize={this.authorize} />
      );
    }
  }
}

export default Header;
