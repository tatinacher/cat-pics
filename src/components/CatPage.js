import React, { Component } from 'react';
import CatSearch from './CatSearch';


class CatPage extends Component {
  
  componentWillMount() {
    document.title = this.props.title || 'Cats';
  }

  render() {
    return (
      <div className="hero-body">
        <div className="container">
          <CatSearch />
        </div>
      </div>
    );
  }
}

export default CatPage;
