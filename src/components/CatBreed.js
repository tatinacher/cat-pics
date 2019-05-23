import React, { Component } from 'react';
import {connect} from 'react-redux';
import fetch from '../actions/fetch-data-action';
import { withRouter } from "react-router";

class CatBreed extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      name: '',
      images: [],
      description: '',
      temperament: '',
    }
  }

  componentWillMount() {
    // request image of searched breed
    if (this.props.catBreeds && this.props.catBreeds.length) {
      this.props.searchImages(this.props.location.search);      
    }
  }

  //after all breeds loaded
  componentWillReceiveProps(nextProps) {

    if (!(this.state.images && this.state.images.length) && !nextProps.isLoadedImage){
      this.props.searchImages(this.props.location.search);
    }
    if (nextProps.isLoadedImage === true && nextProps.catBreeds !== []) {
      
      var idBreed = nextProps.location.search.slice(11);
      var breed = nextProps.catBreeds.find(element => {
        return element.id === idBreed;
      });

      if (breed !== undefined && breed.images !== []){
        
        this.setState({ id: breed.id,
          name: breed.name,
          description: breed.description,
          temperament: breed.temperament,
          images: breed.images});
      }
      
    };
  }

  render() {
    // TODO: on second and other load do unique isLoad
    const {isLoadedImage} = this.props;
    if (!isLoadedImage) {
      return <div></div>;
    }
    return (
      <div className="container ">
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
            {
              this.state.images.map((image, key) => {
                return <img src={image} key={key} alt="Img" />
              })
            }
          </div>
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
                                    isLoadedImage: store.cats.isLoadedImage});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CatBreed));
