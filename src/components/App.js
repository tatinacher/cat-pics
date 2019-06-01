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
import userActions from '../actions/user-action';
import InfoBox from './InfoBox';
import Explore from './Explore';
import Registration from './Registration';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLogin: false
    }
    this.isUserTokenValid = this.isUserTokenValid.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }

  componentWillMount() {
    this.props.fetchData();
    this.checkLogin('a');
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.isLogin && nextProps.activeUser !== '')
      this.checkLogin('v');
    if (nextProps.activeUser === '' && this.state.isLogin)
      this.setState({isLogin: false});
  }

  checkLogin(a) {
    console.log(a);
    if (this.state.isLogin)
      return true;
    const token = sessionStorage.getItem('user');
    if(token === null)
      return false;
    return this.isUserTokenValid(token);
  }

  // check if valid
  isUserTokenValid(token){
    if(this.props.users[token]){
      this.props.authUser(token);
      this.setState({isLogin: true});
      return true;
    }
    return false;
  }
  render() {
    return (
      <section className="hero is-fullheight">
        <InfoBox />
        <Header isLogin={this.state.isLogin} />
        <Switch>
          <Route exact path='/' render={props => <CatPage {...props} title="Beautiful pictures of cats!"/> } />
          <Route exact path='/search' component={CatSearchResult}/>
          <Route exact path='/explore' component={Explore}/>
          <Route
            path="/favorites"
            render={() => this.state.isLogin ? <Favorites /> : <Redirect to="/" />
            }
          />
          <Route
            path="/sign-up"
            render={() => !this.state.isLogin ? <Registration /> : <Redirect to="/" />
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
    fetchData: () => dispatch(fetch.fetchData()),
    authUser: (user) => dispatch(userActions.authUser(user))
  };
}

const mapStateToProps = store => ({ users: store.users.user, activeUser: store.users.activeUser});

export default connect(mapStateToProps, mapDispatchToProps)(App);
