import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.scss';
import CatPage from './CatPage';
import Header from './Header';
import Footer from './Footer';
import 'bulma';
import Favorites from './Favorites';
import {connect} from 'react-redux';
import fetch from '../actions/fetch-data-action';
import userActions from '../actions/user-action';
import InfoBox from './InfoBox';
import Explore from './Explore';
import Registration from './Registration';
import infoActions from '../actions/info-action';
import CatBreed from './CatBreed';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLogin: false
    }
    this.authUserFromToken = this.authUserFromToken.bind(this);
  }

  componentWillMount() {
    this.props.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    //login user
    if (nextProps.activeUser !== '' && !this.state.isLogin){
      this.authUserFromToken(nextProps);
    }
    
    //logout user
    if (nextProps.activeUser === '' && this.state.isLogin){
      this.setState({isLogin: false});
      this.props.logOutInfo();
    }
  }

  authUserFromToken(nextProps) {
    const token = sessionStorage.getItem('user');
    if(token === null)
      return;
    if(nextProps.users[token]){
      this.setState({isLogin: true});
    }
  }

  componentWillUnmount(){
    sessionStorage.removeItem('user');
  }
  
  render() {
    return (
      <section className="hero is-fullheight">
        <InfoBox />
        <Header isLogin={this.state.isLogin} />
        <Switch>
          <Route exact path='/' render={props => <CatPage {...props} title="Beautiful pictures of cats!"/> } />
          <Route exact path='/search' component={CatBreed}/>
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
    authUser: (user) => dispatch(userActions.authUser(user)),
    logOutInfo: () => dispatch(infoActions.logOutInfo()),
  };
}

const mapStateToProps = store => ({ users: store.users.user, activeUser: store.users.activeUser});

export default connect(mapStateToProps, mapDispatchToProps)(App);
