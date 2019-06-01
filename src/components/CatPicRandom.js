import React, { Component } from 'react';
import {connect} from 'react-redux';
import fetch from '../actions/fetch-data-action';
import userActions from '../actions/user-action';
import { withRouter } from "react-router";
import ImageCard from './ImageCard';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class CatPicRandom extends Component {
  constructor(props){
    super(props);
    this.state = {
      image: '',
      user: '',
      isInFav: false,
      photoIndex: 0,
      isOpen: false,
    }
    this.loadNewPic = this.loadNewPic.bind(this);
    this.isImageInFav = this.isImageInFav.bind(this);
  }
  
  componentWillMount(){
    if (this.props.image === ''){
      this.props.getRandomPic();
    } else {
      this.setState({image: this.props.image});
    }

    if (this.props.user)
      this.setState({user: this.props.user});
  }

  componentWillReceiveProps(nextProps){

    if (nextProps.user && nextProps.users && this.state.user !== ''){
      const isInFav = this.isImageInFav(nextProps);
      this.setState({user: nextProps.user, isInFav: isInFav});
    }
    
    this.setState({image: nextProps.image});
  }

  loadNewPic(){
    this.props.getRandomPic();
    this.setState({image: this.props.image});
  }
  
  isImageInFav(nextProps){
    const userImages = nextProps.users[this.state.user].img;
    return userImages.has(nextProps.image);
  }

  render() {
    if (this.state.image === '')
      return <div id="preloader"></div>;
    const { photoIndex, isOpen } = this.state;
    
    return (
      <div className="container ">
        <h1 className="title">You can add cats to favorite album. Just click on star. <span role="img" aria-label="cat">🐈</span></h1>
        <div className="randomImage columns is-gapless">
          <div className="column">
            <ImageCard img={this.state.image} isInFav={this.state.isInFav} user={this.state.user}  onClick={() => this.setState({ isOpen: true})} />
            {isOpen && (
              <Lightbox
                mainSrc={this.state.image}
                nextSrc={null}
                prevSrc={null}
                onCloseRequest={() => this.setState({ isOpen: false })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex: 0,
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: 0,
                  })
                }
              />
            )}
            <button className="button is-primary" onClick={this.loadNewPic}>Load new image</button>
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

const mapStateToProps = store => ({ image: store.cats.randomPic, user: store.users.activeUser, users: store.users.user});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CatPicRandom));