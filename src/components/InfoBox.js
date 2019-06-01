import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router";


class InfoBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      infoText: '',
      color: ''    
    }
    this.hideInfo = this.hideInfo.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.info.text !== '' )
      this.setState({ infoText: nextProps.info.text,
                      color: nextProps.info.color});

      setTimeout(this.hideInfo, 2000);
  }

  hideInfo(){
    this.setState({ infoText: ''});
  }

  render() {
    let infoBoxClass = this.state.color + " infoBox toggleOut hero ";
    if (this.state.infoText !== '') {
      infoBoxClass = this.state.color + " hero infoBox has-text-centered is-vcentered has-text-centered toggleIn";
    }
    return (
      <div className={infoBoxClass}>
        <p>{this.state.infoText}</p>
      </div>
    );
  }
}

const mapStateToProps = store => ({info: store.info});

export default withRouter(connect(mapStateToProps)(InfoBox));