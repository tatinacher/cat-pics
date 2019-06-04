import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import infoActions from '../actions/info-action';


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
    if (nextProps.info.text !== '' ){
      this.setState({ infoText: nextProps.info.text,
        color: nextProps.info.color});

      setTimeout(this.hideInfo, 2000);
    } 
  }

  hideInfo(){
    this.setState({ infoText: ''});
    this.props.clearInfo();
    console.log('hideInfo')
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

function mapDispatchToProps(dispatch) {
  return {
    clearInfo: () => dispatch(infoActions.clearInfo())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InfoBox));