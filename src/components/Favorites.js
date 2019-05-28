import React, { Component } from 'react';
import { withRouter } from "react-router";
import {connect} from 'react-redux';
import ImageCard from './ImageCard';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class Favorites extends Component {
  constructor(props){
    super(props);
    this.state = {
      images: [],
      user: '',
      photoIndex: 0,
      isOpen: false,
    }
  }
  
  componentWillMount() {
    document.title = this.props.title || 'Cats';
    if (this.props.activeUser && this.props.users){
      let username = this.props.activeUser;
      let users = this.props.users;
      let images = users[username].img;
      this.setState({user: username, images: [...images]});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeUser && nextProps.users){
      let username = nextProps.activeUser;
      let users = nextProps.users;
      let images = users[username].img;
      this.setState({user: username, images: [...images]});
    }
  }

  emptyFavorites(){
    console.log(1)
    return(
      <section className="hero-body">
        <div className="container is-desktop is-vcentered has-text-centered">
          <h1 className="title is-3">
            There is no favorite images
          </h1>
          <h2>
            You can find images in search page and add it to favorites.
          </h2>
        </div>
      </section>
    );
  }

  render() {
    if (this.state.images && this.state.images.length === 0){
      return this.emptyFavorites();
    }
    
    const { photoIndex, isOpen } = this.state;
    return (
      <section className="hero-body">
        <div className="container is-desktop is-vcentered has-text-centered">
          <h1 className="title is-3">
            Favorite images
          </h1>
          <div className="favorite-imgs">
            {
              this.state.images.map((img,key) => 
                <div key={key} className="img-container">
                  <ImageCard img={img} isInFav={true} user={this.state.user} onClick={() => this.setState({ isOpen: true, photoIndex: key })} />
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
        </div>
      </section>
    );
  }
}

const mapStateToProps = store => ({ users: store.users.user, activeUser: store.users.activeUser});

export default withRouter(connect(mapStateToProps)(Favorites));