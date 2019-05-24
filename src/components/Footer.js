import React, { Component } from 'react';

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
          <span>Thanks to thecatapi.com</span>
          <span className="is-pulled-right">Made in 2019 by Tatiana Cherednichenko</span>
        </div>
      </div>
    );
  }
}

export default Footer;
