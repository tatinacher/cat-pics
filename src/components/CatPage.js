import React, { Component } from 'react';
import CatSearch from './CatSearch';


class CatPage extends Component {
  
  componentWillMount() {
    document.title = this.props.title || 'Cats';
  }

  render() {
    return (
      <section className="hero-body background-cat">
        <div className="container is-desktop is-vcentered has-text-centered">
          <h1 className="title is-3 has-text-white">
            CatPics
          </h1>
          <h2 className="subtitle has-text-white">
            Beautiful cat pictures 
          </h2>
          <div className="level">
            <CatSearch />
          </div>
        </div>
      </section>
    );
  }
}

export default CatPage;
