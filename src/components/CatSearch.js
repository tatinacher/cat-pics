import React, { Component } from 'react';
import {connect} from 'react-redux';
import Autocomplete from './Autocomplete';
import { withRouter } from "react-router";

class CatSearch extends Component {
  constructor(props){
    super(props);
    this.state = {
      cats: [],
      cat: '',
      id: ''
    }
    this.getBreedNames = this.getBreedNames.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFrom = this.handleChangeFrom.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getBreedNames(breedsInfo) {
    const names = breedsInfo.map(breed => {return [breed.name, breed.id]});
    return names;
  }

  componentWillMount() {
    if (typeof this.props.cats !== 'undefined' && this.props.cats.length > 0) {
      this.setState({cats: this.getBreedNames(this.props.cats)})
    };
  }
  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.cats !== 'undefined' && nextProps.cats.length > 0) {
      this.setState({cats: this.getBreedNames(nextProps.cats)})
    };
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleChangeFrom(value, id) {
    this.setState({cat: value, id: id});
  }

  handleSubmit(event) {
    event.preventDefault();
    const path = '/search?breed_ids='+ this.state.id;

    if (this.props.location.pathname !== '/search/') {
      this.setState({search: true});
      this.props.history.push(path);
    } else {
      this.setState({search: true});
    }
  }



  render() {
    const {isLoaded} = this.props;
    if (!isLoaded) {
      return <div className="columns is-vcentered is-centered">Is loading...</div>;
    }
    return (
      <section className="columns is-vcentered is-centered">
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="field has-addons">
              <div className="control">
                <Autocomplete
                      key="cat_breeds"
                      data={this.state.cats}
                      handleChange={this.handleChange}
                      handleChangeSet={this.handleChangeFrom}
                      placeholder="Type cat name"
                      name="cat_breeds"
                      value={this.state.cat}
                      data-id={this.state.id}
                    />
            </div>
            <div className="control">
              <input className="button is-info" type="submit" value="Search" />
            </div>
          </div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = store => ({cats: store.cats.catBreeds, isLoaded: store.cats.isLoaded});

export default withRouter(connect(mapStateToProps)(CatSearch));
