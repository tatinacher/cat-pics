import React, { Component } from 'react';
import CatSearch from './CatSearch';


class Favorites extends Component {
  
  componentWillMount() {
    document.title = this.props.title || 'Cats';
  }

  render() {
    return (
      <section className="hero-body background-cat">
        <div className="container is-desktop is-vcentered has-text-centered">
          <h1 className="title is-3 has-text-white">
            FAVORITES
          </h1>
          <h2 className="subtitle has-text-white">
          FAVORITES
          </h2>
          <div className="level">
            <CatSearch />
          </div>
        </div>
      </section>
    );
  }
}

export default Favorites;
