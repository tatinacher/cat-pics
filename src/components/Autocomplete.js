import React, {Component} from 'react';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      source: [],
      suggestions: [],
      suggestionsVisible: false,
      selectedIdx: 0, 
      id: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSelectSuggestion = this.handleSelectSuggestion.bind(this);
  }

  componentWillMount() {
    this.setState({source: this.props.data, query: this.props.value, id: this.props.id});
  }

  handleChange(e) {
    this.props.handleChange(e);
    // clear the suggestions
    this.setState({
      suggestions: [],
      suggestionsVisible: false
    });

    const source = this.state.source;
    const query = e.target.value.toLowerCase();
    const suggestions = source
      .filter(option => option[0].toLowerCase().startsWith(query))
      .slice(0, 4);
    this.setState({
      query: e.target.value,
      suggestions: suggestions,
      suggestionsVisible: true
    });
  }

  handleFocus() {
    this.setState({
      suggestionsVisible: false,
      selectedIdx: 0
    });
  }

  handleKeyPress(e) {
    switch (e.keyCode) {
      case 38:
        if (this.state.selectedIdx <= 0) {
          break;
        }
        return this.setState({
          selectedIdx: this.state.selectedIdx - 1
        });

      case 40:
        if (this.state.selectedIdx >= this.state.suggestions.length - 1) {
          break;
        }
        return this.setState({
          selectedIdx: this.state.selectedIdx + 1
        });

      case 27:
        return this.setState({
          suggestionsVisible: false
        });

      case 13:
        return this.setState({
          query: this.state.suggestions[this.state.selectedIdx][0]
        });

      default:
        break;
    }
    return null;
  }

  handleSelectSuggestion(value, id) {
    this.props.handleChangeSet(value, id);
    this.setState({
      query: value,
      suggestionsVisible: false,
      id: id
    });
  }

  render() {
    return (
      <div>
        <input
          id={this.props.keyName}
          key={this.props.keyName}
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyUp={this.handleKeyPress}
          name={this.props.name}
          placeholder={this.props.placeholder}
          className="input is-medium"
          data-id={this.state.id}
        />
        <div className="ac-result">
          {this.state.suggestionsVisible &&
          this.state.suggestions.length > 0 ? (
              <ul className="dropdown-content">
                {this.state.suggestions.map((suggestion, i) => (
                  <li
                    key={suggestion[1]}
                    className={
                      this.state.selectedIdx === i
                        ? 'selected item ac-option dropdown-item'
                        : 'item ac-option dropdown-item'
                    }
                    onClick={() => this.handleSelectSuggestion(suggestion[0], suggestion[1])}
                  >
                    {suggestion[0]}
                  </li>
                ))}
              </ul>
            ) : null}
        </div>
      </div>
    );
  }
}

export default Autocomplete;
