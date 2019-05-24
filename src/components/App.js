import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import CatPage from './CatPage';
import Header from './Header';
import Footer from './Footer';
import 'bulma';
import CatSearchResult from './CatSearchResult';
import Favorites from './Favorites';
import {connect} from 'react-redux';
import fetch from '../actions/fetch-data-action';

class App extends Component {
  componentWillMount() {
    this.props.fetchData();
  }

  checkLogin() {
    const login = sessionStorage.getItem('user');
    console.log(login)
    return login === 'user' || false;
  }


  render() {
    return (
      <section className="hero is-fullheight">
        <Header checkLogin={this.checkLogin} />
        <Switch>
          <Route exact path='/' render={props => <CatPage {...props} title="Beautiful pictures of cats!"/> } />
          <Route exact path='/search' component={CatSearchResult}/>
          <Route
            path="/favorites"
            render={() => this.checkLogin() ? <Favorites /> : <Redirect to="/" />
            }
          />
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
