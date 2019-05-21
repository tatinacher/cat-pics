import React, { Component } from 'react';
import CatBreed from './CatBreed';

class CatSearchResult extends Component {
  render() {
    return (
      <div className="hero-body">
        <div className="container">
          <CatBreed />
        </div>
      </div>
    );
  }
}

export default CatSearchResult;
