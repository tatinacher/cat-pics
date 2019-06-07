import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Footer extends Component {
  constructor(props){
    super(props);
    this.state = {
      plant: [],
    }
  }

  render() {
    return (
      <div className="hero-foot">
        <div className="container">
          <div class="columns">
            <div class="column">
              <span>Thanks to <Link to="thecatapi.com">thecatapi.com</Link></span>
              <span>Photo by Kasya Shahovskaya on Unsplash</span>
            </div>
            <div class="column">
              <span className="column is-pulled-right">Made in 2019 by Tatiana Cherednichenko</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
