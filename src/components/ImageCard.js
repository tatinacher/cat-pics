import React, { Component } from 'react';
import {connect} from 'react-redux';
import userActions from '../actions/user-action';
import { withRouter } from "react-router";

class ImageCard extends Component {
  constructor(props){
    super(props);

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
    const divStyle = (src) => ({
      backgroundImage: 'url(' + src + ')'
    });
    const toggleFavorite = (this.props.isInFav) ? this.deleteImgFromFavorite : this.saveImgToFavorite;
    const star_icon = (this.props.isInFav) ? "fas fa-star fa-2x": "far fa-star fa-2x";
    return(
        <div key={this.props.isInFav} className="img-block" style={divStyle(this.props.img)}>
              <button className="star-image" onClick={toggleFavorite} >
                <span className="icon has-text-star">
                  <i className={star_icon}></i>
                  </span>
              </button>
            </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveUserImage: (user, image) => dispatch(userActions.addImageToFavorite(user, image)),
    deleteUserImage: (user, image) => dispatch(userActions.deleteImageFromFavorite(user, image)),
  };
}

export default withRouter(connect(null, mapDispatchToProps)(ImageCard));