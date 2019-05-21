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
      <div className="hero-foot footer">
        <div className="container">
          2019 Tatiana Cherednichenko
        </div>
      </div>
    );
  }
}

export default Footer;
