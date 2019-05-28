import React, { Component } from 'react';
import {connect} from 'react-redux';
import fetch from '../actions/fetch-data-action';
import userActions from '../actions/user-action';
import { withRouter } from "react-router";
import ImageCard from './ImageCard';

class CatPicRandom extends Component {
  constructor(props){
    super(props);
    this.state = {
      image: '',
      user: '',
      isInFav: false,
    }
    this.loadNewPic = this.loadNewPic.bind(this);
    this.isImageInFav = this.isImageInFav.bind(this);
  }
  
  componentWillMount(){
    const picture = this.props.randomPicture;
    if (picture === ''){
      this.props.getRandomPic();
    }
    this.setState({user: this.props.user});
  }

  componentWillReceiveProps(nextProps){
    const isInFav = this.isImageInFav(nextProps);
    this.setState({image: nextProps.randomPicture, user: nextProps.user, isInFav: isInFav});
  }

  loadNewPic(){
    this.props.getRandomPic();
    this.setState({image: this.props.randomPicture});
  }
  isImageInFav(nextProps){
    const userImages = nextProps.users[this.state.user].img;
    return userImages.has(nextProps.randomPicture);
  }

  render() {
    if (this.state.image === '')
      return <div>No images for you</div>;
    return (
      <div className="container ">
        <h1 className="title">You can add cats to favorite album. Just click on star. <span role="img" aria-label="cat">🐈</span></h1>
        <div className="randomImage columns is-gapless">
          <div className="column">
            <ImageCard img={this.state.image} isInFav={this.state.isInFav} user={this.state.user}/>
            <button onClick={this.loadNewPic}>Load new image</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getRandomPic: (q) => dispatch(fetch.getRandomPic(q)),
    saveUserImage: (user, image) => dispatch(userActions.addImageToFavorite(user, image))
  };
}

const mapStateToProps = store => ({ randomPicture: store.cats.randomPic, user: store.users.activeUser, users: store.users.user});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CatPicRandom));