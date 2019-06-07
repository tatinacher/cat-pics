import React, { Component } from 'react';
import {connect} from 'react-redux';
import userActions from '../actions/user-action';
import { withRouter } from "react-router";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import infoActions from '../actions/info-action';

class ImageCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      copied: false,
    }

    this.saveImgToFavorite = this.saveImgToFavorite.bind(this);
    this.deleteImgFromFavorite = this.deleteImgFromFavorite.bind(this);
  }

  saveImgToFavorite(){
    if(this.props.user && this.props.user !== ''){
      this.props.saveUserImage(this.props.user, this.props.img);
    }
  }

  deleteImgFromFavorite(){
    if(this.props.user && this.props.user !== ''){
      this.props.deleteUserImage(this.props.user, this.props.img);
    }
  }

  render() {
    if (this.props.img === '')
      return <div id="preloader"></div>;
    const divStyle = (src) => ({
      backgroundImage: 'url(' + src + ')'
    });
    const toggleFavorite = (this.props.isInFav) ? this.deleteImgFromFavorite : this.saveImgToFavorite;
    const star_icon = (this.props.isInFav) ? "fas fa-star fa-2x": "far fa-star fa-2x";
    const iconClass = (this.props.user !== '') ? "icon has-text-star"  : "icon has-text-star hidden";
    return(
        <div key={this.props.isInFav} className="img-block" style={divStyle(this.props.img)} >
              <button className="icon star-image" onClick={toggleFavorite} >
                <span className={iconClass}>
                  <i className={star_icon}></i>
                  </span>
              </button>
              <CopyToClipboard text={this.props.img}
                onCopy={() => this.setState({copied: true})}>
                <button className="icon star-image" onClick={this.props.copyInfo}>
                  <span className={iconClass}>
                    <i className="far fa-copy fa-2x"></i>
                    </span>
                </button>
              </CopyToClipboard>
              
              <div className="image-clickable" onClick={this.props.onClick}></div>
              
            </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveUserImage: (user, image) => dispatch(userActions.addImageToFavorite(user, image)),
    deleteUserImage: (user, image) => dispatch(userActions.deleteImageFromFavorite(user, image)),
    copyInfo: () => dispatch(infoActions.copyInfo())
  };
}

export default withRouter(connect(null, mapDispatchToProps)(ImageCard));