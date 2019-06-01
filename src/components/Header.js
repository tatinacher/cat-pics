import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import HeaderAuthorized from './HeaderAuthorized';
import HeaderUnauthorized from './HeaderUnauthorized';
import Dropdown from './Dropdown'
import {Link} from 'react-router-dom';
import Auth from './Auth'
import userActions from '../actions/user-action';


class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      isDropdownHidden: true,
      isMenuHidden: true,
    }
    this.logOut = this.logOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleBurger = this.toggleBurger.bind(this);
  }

  logOut() {
    sessionStorage.removeItem('user');
    this.props.logOut();
    this.setState({username: '', isDropdownHidden: true, isMenuHidden: true});
  }

  handleClick(e){
    this.setState({isDropdownHidden: !this.state.isDropdownHidden});
  }

  toggleBurger(){
    this.setState({isMenuHidden: !this.state.isMenuHidden})
  }

  render() {
    let isLogin = this.props.isLogin;
    let headerAuth = isLogin ? 
                      <HeaderAuthorized logOut={this.logOut} handleClick={this.handleClick} /> : 
                      <HeaderUnauthorized logIn={this.logIn} handleClick={this.handleClick} />;

    let headerDropdown = isLogin ? 
                          <Dropdown isHidden={this.state.isDropdownHidden} logOut={this.logOut}
                                    closeMenu={() => {this.setState({isMenuHidden: true, isDropdownHidden: true})}}  
                                    closeDropdown={() => {this.setState({isDropdownHidden: true})}} /> :
                          <Auth isHidden={this.state.isDropdownHidden} logIn={this.logIn} 
                                closeMenu={() => {this.setState({isMenuHidden: true, isDropdownHidden: true})}}  
                                closeDropdown={() => {this.setState({isDropdownHidden: true})}} />

    let menu_class = this.state.isMenuHidden ? "navbar-menu" : "navbar-menu open"
    return(
      <div className="hero-head">
        <nav className="navbar has-shadow is-spaced">
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item is-active">
                <span className="icon has-text-warning is-large">
                  <i className="fas fa-paw fa-2x"></i>
                </span>
                <p className="subtitle">CatPics</p>
              </Link>
              <span className="navbar-burger burger" data-target="navbarMenuHeroA" onClick={this.toggleBurger}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenuHeroA" className={menu_class}>
              <div className="navbar-end">
                <Link to="explore" className="navbar-item">
                  <span className="icon has-text-info">
                    <i className="fas fa-search "></i>
                  </span>
                  <span>Explore</span>
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

function mapDispatchToProps(dispatch) {
  return {
    logOut: () => dispatch(userActions.logOut()),
  };
}

export default withRouter(connect(null, mapDispatchToProps)(Header));