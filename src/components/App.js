import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import CatPage from './CatPage';
import Header from './Header';
import Footer from './Footer';
import 'bulma';
import CatSearchResult from './CatSearchResult';
import {connect} from 'react-redux';
import fetch from '../actions/fetch-data-action';

class App extends Component {
  componentWillMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <section className="hero is-fullheight">
        <Header />
        <Switch>
          <Route exact path='/' render={props => <CatPage {...props} title="Find a cat!"/> } />
          <Route exact path='/search' component={CatSearchResult}/>
        </Switch>
        <Footer />
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => dispatch(fetch.fetchData())
  };
}

export default connect(null, mapDispatchToProps)(App);
