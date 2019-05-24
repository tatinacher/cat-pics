import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import {Link} from 'react-router-dom';

class Dropdown extends Component {
  
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className={this.props.isHidden ? "auth-form is-hidden" : "auth-form"} >
        <div className="dropdown-caret right"> 
          <span className="caret-outer"></span> 
          <span className="caret-inner"></span> 
        </div>
        <div className="field">
          <Link to="/settings" className="">Settings</Link>
        </div>
        <div className="field">
          <Link to="#" className="logout-button" onClick={this.props.logOut} >Log Out</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({ users: store.users.user});

export default withRouter(connect(mapStateToProps)(Dropdown));
