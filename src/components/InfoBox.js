import React, { Component } from 'react';
import CatSearch from './CatSearch';
import CatPicRandom from './CatPicRandom';


class CatPage extends Component {
  
  componentWillMount() {
    document.title = this.props.title || 'Cats';
  }

  render() {
    return (
      <div className="infoBox hidden">
      
      </div>
    );
  }
}

export default CatPage;
