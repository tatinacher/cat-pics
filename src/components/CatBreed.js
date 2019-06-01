import React, { Component } from 'react';
import {connect} from 'react-redux';
import fetch from '../actions/fetch-data-action';
import { withRouter } from "react-router";
import CatSearch from './CatSearch';
import ImageCard from './ImageCard';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class CatBreed extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: '',
      id: '',
      name: '',
      image: '',
      description: '',
      temperament: '',
      breedInfo: [],
      photoIndex: 0,
      isOpen: false,
      isInFav: false,
    }
    this.findBreed = this.findBreed.bind(this);
  }

  componentWillMount() {
    // request image of searched breed
    if (this.props.catBreeds && this.props.catBreeds.length) {
      this.props.searchImages(this.props.location.search);      
    }
    if (this.props.user)
      this.setState({user: this.props.user});
  }

  //after all breeds loaded
  componentWillReceiveProps(nextProps) {

    if (this.state.image === '' && this.props.location.search !== ""){
      console.log(this.state.image, this.props.location.search)
      this.props.searchImages(this.props.location.search);
    }
    if (nextProps.catBreeds !== []) {
      
      var idBreed = nextProps.location.search.slice(11);
      var breed = this.findBreed(nextProps.catBreeds, idBreed);

      if (breed !== undefined && breed.images !== undefined && breed.images.length !== 0){
        
        this.setState({ id: breed.id,
          name: breed.name,
          description: breed.description,
          temperament: breed.temperament,
          image: breed.images[0],
          breedInfo: breed});
      }
      
    };
    if (nextProps.user){
      const isInFav = this.isImageInFav(nextProps);
      this.setState({user: nextProps.user, isInFav: isInFav});
    }
    
  }

  findBreed(breedsArray, idBreed){
    return breedsArray.find(element => {
      return element.id === idBreed;
    });
  }

  isImageInFav(nextProps){
    const userImages = nextProps.users[this.state.user].img;
    return userImages.has(nextProps.randomPicture);
  }

  render() {
    if (this.props.location.search === ""){
      return <section className="level-item has-text-centered"><CatSearch /></section>;
    }
    if (this.state.image === '') {
      return <section className="level-item has-text-centered"><div id="preloader"></div></section>;
    }
    const { isOpen } = this.state;

    return (
      <div className="container">
        <div className="columns">
          <div className="column">
            <h1 className="title">
              {this.state.name}
            </h1>
            <h2 className="subtitle">
              {this.state.description}
            </h2>
            <p>Temperament: {this.state.temperament}</p>
          </div>
          <div className="column">
            <ImageCard img={this.state.image} isInFav={this.state.isInFav} user={this.state.user}  onClick={() => this.setState({ isOpen: true})} />
          </div>
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
        </div>
      </div>
    );
  }
}



function mapDispatchToProps(dispatch) {
  return {
    searchImages: (q) => dispatch(fetch.searchImages(q))
  };
}
const mapStateToProps = store => ({ catBreeds: store.cats.catBreeds, 
                                    catBreedImages: store.cats.catBreedImages,
                                    user: store.users.activeUser, users: store.users.user});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CatBreed));
