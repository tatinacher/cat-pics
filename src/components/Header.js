import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import HeaderAuthorized from './HeaderAuthorized';
import HeaderUnauthorized from './HeaderUnauthorized';
import Dropdown from './Dropdown'
import {Link} from 'react-router-dom';
import Auth from './Auth'


class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      isDropdownHidden: true,
      isMenuHidden: true
    }
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount(){
    this.setState({username: this.props.name})
  }

  logIn(name) {
    this.setState({username: name});
  }

  logOut() {
    sessionStorage.removeItem('user');
    this.setState({username: ''});
  }

  handleClick(e){
    this.setState({isDropdownHidden: !this.state.isDropdownHidden});
  }

  toggleBurger(){
    
  }

  render() {
    let isLogin = this.props.checkLogin();
    let headerAuth = isLogin ? 
                      <HeaderAuthorized name={this.state.username} logOut={this.logOut} handleClick={this.handleClick} /> : 
                      <HeaderUnauthorized logIn={this.logIn} handleClick={this.handleClick} />;

    let headerDropdown = isLogin ? 
                          <Dropdown isHidden={this.state.isDropdownHidden} logOut={this.logOut} /> :
                          <Auth isHidden={this.state.isDropdownHidden} logIn={this.logIn}  />


    return(
      <div className="hero-head">
        <nav className="navbar has-shadow is-spaced">
          <div className="container">
            <div className="navbar-brand">
              <span className="icon is-large has-text-danger">
                <i className="fas fa-heart fa-2x"></i>
              </span>
              <span className="navbar-burger burger" data-target="navbarMenuHeroA" onClick={this.toggleBurger}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenuHeroA" className="navbar-menu">
              <div className="navbar-end">
                <Link to="/" className="navbar-item is-active">
                  <span className="icon has-text-primary">
                    <i className="fas fa-home"></i>
                  </span>
                  <span>Home</span>
                </Link>
                <Link to="search" className="navbar-item">
                  <span className="icon has-text-info">
                    <i className="fas fa-search "></i>
                  </span>
                  <span>Search</span>
                </Link>
                {headerAuth}
              </div>
            </div>
            {headerDropdown}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = store => ({ name: store.users.activeUser});

export default withRouter(connect(mapStateToProps)(Header));