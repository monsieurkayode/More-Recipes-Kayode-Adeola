import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import PropTypes from 'proptypes';
import { Link } from 'react-router-dom';

import { searchPost } from '../../actions';
import cleanString from '../../../../shared/cleanString';
import Categories from '../../../../shared/categories';
import pascalCase from '../../utils/pascalCase';

/**
 * @summary - Category class declaration
 * @class Category
 * @extends {Component}
 */
class Category extends Component {
  /**
   * Component constructor
   * @param {object} props
   * @memberOf Category
   */
  constructor(props) {
    super(props);
    this.state = {
      searchType: '',
      searchTerm: ''
    };
  }

  /**
   * @method componentDidMount
   *
   * @param {void} void
   *
   * @returns {void}
   */
  componentDidMount() {
    $((this.search)).on('change', this.handleSearchType);
  }

  /**
   * @method componentWillUpdate
   *
   * @param {void} void
   *
   * @returns {void}
   */
  componentWillUpdate() {
    $('select').material_select();
  }

  /**
   * Handle search
   * @method handleSearch
   *
   * @param {void} void
   *
   * @returns {void}
   */
  handleSearch = () => {
    const { searchType, searchTerm } = this.state;
    if ((cleanString(searchTerm)).length % 3 === 0) {
      this.props.searchPost(searchType, searchTerm);
    }
  }

  /**
   * Handle change
   * @method handleChange
   *
   * @param {object} event
   *
   * @returns {void}
   */
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Handle search criteria
   * @method handleSearchType
   *
   * @param {object} event
   *
   * @returns {void}
   */
  handleSearchType = (event) => {
    this.setState({
      searchType: event.target.value
    });
  }

  /**
   * @method renderCategory
   *
   * @param {number} index
   *
   * @returns {JSX} JSX
   */
  renderCategory = (index) => {
    const category = Categories[index];
    return (
      <li key={category}>
        <Link
          to={`/category/${category}`}
          className="collapsible-header"
        >
          {pascalCase(category)}
        </Link>
      </li>
    );
  }

  /**
   * Renders the component
   * @method render
   *
   * @returns {JSX} JSX
   */
  render() {
    const handleSearch = debounce(() => { this.handleSearch(); }, 300);
    const { isAuthenticated } = this.props;
    return (
      <div className="col l2 offset-l1 m2 s12">
        {isAuthenticated &&
        <form id="search-form" onChange={handleSearch}>
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
        <div className="category hide-on-small-only">
          <div>
            <div>
              <b>Featured Categories</b>
              <p className="divider" />
            </div>
            <ul className="collapsible z-depth-0">
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
