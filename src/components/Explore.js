import React, { Component } from 'react';
import {connect} from 'react-redux';
import fetch from '../actions/fetch-data-action';
import { withRouter } from "react-router";
import ImageCard from './ImageCard';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import ReactPaginate from 'react-paginate';

class Explore extends Component {
  constructor(props){
    super(props);
    this.state = {
      images: [],
      page: 0,
      order: 'Desc',
      photoIndex: 0,
      isOpen: false,
      isInFav: false,
      user: '',
      maxPages: 0
    }
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
    this.props.exploreImages(this.state.order, 1);
    if (this.props.user)
      this.setState({user: this.props.user});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.images.length !== 0)
      this.setState({images: nextProps.images, maxPages: parseInt(nextProps.maxPages)});

    let imagesInFav = [];
    if (nextProps.user && nextProps.users && this.state.user !== ''){
      console.log(1)

      nextProps.images.forEach(img => {
        const isInFav = this.isImageInFav(nextProps, img);
        imagesInFav.push(isInFav);
      })
     
      this.setState({user: nextProps.user, isInFav: imagesInFav});
    }
  }

  findBreed(breedsArray, idBreed){
    return breedsArray.find(element => {
      return element.id === idBreed;
    });
  }

  isImageInFav(nextProps, image){
    const userImages = nextProps.users[this.state.user].img;
    return userImages.has(image);
  }

  handlePageClick(data){
      let selected = parseInt(data.selected) + 1;
      this.setState({page: selected});
      console.log(selected)
      this.props.exploreImages(this.state.order, this.state.page);
  }

  render() {
    if (this.state.images.length === 0) {
      return <section className="level-item has-text-centered"><div id="preloader"></div></section>;
    }
    const { photoIndex, isOpen } = this.state;
    return (
      <div className="container">
        <div className="columns">
          <div className="column">
            <h1 className="title">
              Explore Cat Pictures
            </h1>
            <div className="favorite-imgs">
              {
                this.state.images.map((img,key) => 
                  <div key={key} className="img-container">
                    <ImageCard img={img} isInFav={this.state.isInFav[key]} user={this.state.user} onClick={() => this.setState({ isOpen: true, photoIndex: key })} />
                  </div>
                )
              }
            </div>
          </div>
          {isOpen && (
          <Lightbox
            mainSrc={this.state.images[photoIndex]}
            nextSrc={this.state.images[(photoIndex + 1) % this.state.images.length]}
            prevSrc={this.state.images[(photoIndex + this.state.images.length - 1) % this.state.images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + this.state.images.length - 1) % this.state.images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % this.state.images.length,
              })
            }
          />
        )}
        </div>
        <ReactPaginate
          previousLabel={'‹'}
          nextLabel={'›'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.maxPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}



function mapDispatchToProps(dispatch) {
  return {
    exploreImages: (order, page) => dispatch(fetch.exploreImages(order, page))
  };
}
const mapStateToProps = store => ({ images: store.cats.exploreImages, 
                                    maxPages: store.cats.maxPages, 
                                    user: store.users.activeUser, users: store.users.user});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Explore));
