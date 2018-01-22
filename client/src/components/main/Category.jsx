import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'proptypes';

import { searchPost } from '../../actions';
import { CategoryCollection } from './';
import cleanString from '../../../../shared/cleanString';
import Categories from '../../../../shared/categories';
import pascalCase from '../../utils/pascalCase';

class Category extends Component {
  constructor() {
    super();
    this.state = {
      searchType: '',
      searchTerm: ''
    };
  }

  componentDidMount() {
    // eslint-disable-next-line
    $(findDOMNode(this.search))
      .on('change', this.handleSearchType);
  }

  componentWillUpdate() {
    $('select').material_select();
  }

  handleSearch = () => {
    const { searchType, searchTerm } = this.state;
    if ((cleanString(searchTerm)).length % 3 === 0) {
      this.props.searchPost(searchType, searchTerm);
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSearchType = (event) => {
    this.setState({
      searchType: event.target.value
    });
  }

  renderCategory = (key) => {
    const category = Categories[key];
    return (
      <CategoryCollection key={key} category={pascalCase(category)} />
    );
  }

  render() {
    const handleSearch = _.debounce(() => { this.handleSearch(); }, 300);
    const { isAuthenticated } = this.props;
    return (
      <div className="col l2 offset-l1 m2 hide-on-small-only">
        <span className="">Category</span>
        <p className="divider" />
        <div id="category">
          <div style={{ marginTop: 10 }}>
            {isAuthenticated && <form onChange={handleSearch}>
              <input
                onChange={this.handleChange}
                value={this.state.searchTerm}
                className="white input-fa"
                name="searchTerm"
                type="text"
                placeholder="&#xf002; Enter search keyword..."
              />
              <select
                ref={(ref) => { this.search = ref; }}
                value={this.state.searchType}
              >
                <option value="" disabled>Search criteria</option>
                <option value="name">Title</option>
                <option value="category">Category</option>
                <option value="ingredients">Ingredients</option>
              </select>
            </form>}
            <div style={{ marginTop: 20 }}>
              <b>Featured Categories</b>
            </div>
            <ul className="collapsible z-depth-0" data-collapsible="accordion">
              {Categories.slice(6).map(
                (category, index) => this.renderCategory(index)
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  recipes,
  signinState
}) => ({
  recipes,
  isAuthenticated: signinState.isAuthenticated
});

Category.propTypes = {
  searchPost: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, { searchPost })(Category);
