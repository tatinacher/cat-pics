import React, { Component } from 'react';
import Search from './Search';
import RandomImage from './RandomImage';


class CatPage extends Component {
  
  componentWillMount() {
    document.title = this.props.title || 'Cats';
  }

  render() {
    return (
      <div>
      <section className="hero-body background-cat">
        <div className="container is-desktop is-vcentered has-text-centered ">
          <h1 className="title is-3 has-text-white">
            CatPics
          </h1>
          <h2 className="subtitle has-text-white">
            Beautiful cat pictures 
          </h2>
          <div className="level">
            <Search />
          </div>
        </div>
      </section>
      <section className="hero-body">
        <div className="container is-desktop is-vcentered has-text-centered">
          <RandomImage />
        </div>
      </section>
      </div>
    );
  }
}

export default CatPage;
