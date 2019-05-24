import React, { Component } from 'react';
import {connect} from 'react-redux';
import fetch from '../actions/fetch-data-action';
import { withRouter } from "react-router";

class CatPicRandom extends Component {
  constructor(props){
    super(props);
    this.loadNewPic = this.loadNewPic.bind(this);
  }
  
  componentWillMount(){
    if (this.props.randomPicture === '')
      this.props.getRandomPic()
  }

  loadNewPic(){
    this.props.getRandomPic();
    this.setState({});
  }

  render() {
    let image = this.props.randomPicture;
    if (image === '')
      return null;
    return (
      <div className="container ">
        <h1 className="title">Click the picture to load another one 🐈</h1>
        <div className="randomImage columns is-gapless">
          <div className="column">
            <img src={image} alt="Random cat img" className="random-image" onClick={this.loadNewPic} />
            <button class="star-image">
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
    getRandomPic: (q) => dispatch(fetch.getRandomPic())
  };
}
const mapStateToProps = store => ({ randomPicture: store.cats.randomPic});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CatPicRandom));