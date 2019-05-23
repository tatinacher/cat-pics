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
          <span className="is-pulled-right">2019 Tatiana Cherednichenko</span>
        </div>
      </div>
    );
  }
}

export default Footer;
