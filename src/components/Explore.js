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
      page: 1,
      photoIndex: 0,
      order: 'Asc',
      isOpen: false,
      isInFav: false,
      user: '',
      maxPages: 0,
      type: 'gif,jpg,png',
    }
    this.handlePageClick = this.handlePageClick.bind(this);
    this.sortImages = this.sortImages.bind(this);
    this.filterImages = this.filterImages.bind(this);
    this.setSortClasses = this.setSortClasses.bind(this);
    this.setFilterClasses = this.setFilterClasses.bind(this);
  }

  componentWillMount() {
    this.props.exploreImages(this.state.order, this.state.page, this.state.type);
    if (this.props.user)
      this.setState({user: this.props.user});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.images.length !== 0)
      this.setState({images: nextProps.images, maxPages: parseInt(nextProps.maxPages)});

    let imagesInFav = [];
    if (nextProps.user && nextProps.users && this.state.user !== ''){
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
      this.props.exploreImages(this.state.order, this.state.page, this.state.type);
  }

  filterImages(e){
    this.setState({type: e.target.name,  images: []}, function () {
      this.props.exploreImages(this.state.order, this.state.page, this.state.type);  
    });
  }

  sortImages(e){
    this.setState({order: e.target.name, images: []}, function () {
      this.props.exploreImages(this.state.order, this.state.page, this.state.type);  
    });
  }

  setSortClasses(){
    let ascClass = 'button sort_item', descClass = 'button sort_item', randClass = 'button sort_item';
    switch(this.state.order){
      case 'Asc':
        ascClass += ' is-info is-active';
        break;
      case 'Desc':
        descClass += ' is-info is-active';
        break;
      case 'Rand':
        randClass += ' is-info is-active';
        break;
      default:
        break;
    }
    return {ascClass, descClass, randClass}
  }

  setFilterClasses(){
    let allClass = 'button filter_item', staticImgClass = 'button filter_item', gifClass = 'button filter_item';
    switch(this.state.type){
      case 'gif':
        gifClass += ' is-info is-active';
        break;
      case 'jpg,png':
        staticImgClass += ' is-info is-active';
        break;
      case 'gif,jpg,png':
        allClass += ' is-info is-active';
        break;
      default:
        allClass += ' is-info is-active';
        break;
    }
    return {allClass, staticImgClass, gifClass}
  }

  render() {
    if (this.state.images.length === 0) {
      return <section className="level-item has-text-centered"><div id="preloader"></div></section>;
    }
    const { photoIndex, isOpen } = this.state;
    const {ascClass, descClass, randClass} = this.setSortClasses();
    const {allClass, staticImgClass, gifClass} = this.setFilterClasses();
    const pagination = (this.state.order === 'Rand') ? 'hidden' : '';

    return (
      <div className="container">
            <h1 className="title">
              Explore Cat Pictures
            </h1>
            <div className="sort">
            <div className="buttons is-pulled-left">
                <button className={ascClass} onClick={this.sortImages} name="Asc">↑</button>
                <button className={descClass} onClick={this.sortImages} name="Desc">↓</button>
                <button className={randClass} onClick={this.sortImages} name="Rand">Random</button>
              </div>
              <div className="buttons is-pulled-right">
                <button className={allClass} onClick={this.filterImages} name="gif,jpg,png">All</button>
                <button className={staticImgClass} onClick={this.filterImages} name="jpg,png">JPG/PNG</button>
                <button className={gifClass} onClick={this.filterImages} name="gif">GIF</button>
              </div>
            </div>
            <div className="favorite-imgs">
              {
                this.state.images.map((img,key) => 
                  <div key={key} className="img-container">
                    <ImageCard img={img} isInFav={this.state.isInFav[key]} user={this.state.user} onClick={() => this.setState({ isOpen: true, photoIndex: key })} />
                  </div>
                )
              }
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
        <div className={pagination}>
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
        
      </div>
    );
  }
}



function mapDispatchToProps(dispatch) {
  return {
    exploreImages: (order, page, type) => dispatch(fetch.exploreImages(order, page, type))
  };
}
const mapStateToProps = store => ({ images: store.cats.exploreImages, 
                                    maxPages: store.cats.maxPages, 
                                    user: store.users.activeUser, users: store.users.user});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Explore));
