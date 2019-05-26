import React, { Component } from 'react';
import {connect} from 'react-redux';
import fetch from '../actions/fetch-data-action';
import userActions from '../actions/user-action';
import { withRouter } from "react-router";

class CatPicRandom extends Component {
  constructor(props){
    super(props);
    this.state = {
      image: '',
      user: ''
    }
    this.loadNewPic = this.loadNewPic.bind(this);
    this.saveImgToFavorite = this.saveImgToFavorite.bind(this);
  }
  
  componentWillMount(){
    if (this.props.randomPicture === ''){
      this.props.getRandomPic();
      this.setState({image: this.props.randomPicture});
    }
    this.setState({user: this.props.user})
  }

  componentWillReceiveProps(nextProps){
    this.setState({image: nextProps.randomPicture, user: nextProps.user});
  }

  loadNewPic(){
    this.props.getRandomPic();
    this.setState({image: this.props.randomPicture});
  }

  saveImgToFavorite(){
    console.log(this.state.user)
    if(this.state.user && this.state.user !== '')
      this.props.saveUserImage(this.state.user, this.state.image);
  }

  render() {
    if (this.state.image === '')
      return null;
    return (
      <div className="container ">
        <h1 className="title">Click the picture to load another one 🐈</h1>
        <div className="randomImage columns is-gapless">
          <div className="column">
            <img src={this.state.image} alt="Random cat img" className="random-image" onClick={this.loadNewPic} />
            <button className="star-image" onClick={this.saveImgToFavorite}>
              <span className="icon has-text-star">
                <i className="far fa-star fa-2x"></i>
              </span>
            </button>
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

const mapStateToProps = store => ({ randomPicture: store.cats.randomPic, user: store.users.activeUser});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CatPicRandom));