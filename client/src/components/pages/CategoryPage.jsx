import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import ReactPaginate from 'react-paginate';
import classnames from 'classnames';
import PropTypes from 'proptypes';

import {
  upvoteAction,
  downvoteAction,
  fetchRecipesByCategory,
} from '../../actions';
import { HomeNavbar, Banner } from '../headers';
import { RecipeItem, Loader, SideNav } from '../main';
import Footer from '../footer';
import materializeJavascript from '../../utils/materializeJavascript';
import categories from '../../../../shared/categories';
import pascalCase from '../../utils/pascalCase';
import resetPage from '../../utils/resetPage';
import sad from '../../../assets/css/img/sad.png';
import happySmiley from '../../../assets/css/img/happy_smiley.png';

/**
 * @summary - CategoryPage class declaration
 * @class CategoryPage
 * @extends {Component}
 */
export class CategoryPage extends Component {
  /**
   * Component constructor
   * @param {object} props
   * @memberOf IndexPage
   */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      firstLoad: true,
      limit: 9,
      changeSmiley: false
    };
    this.toggleSmiley = this.toggleSmiley.bind(this);
    this.setPagination = this.setPagination.bind(this);
    this.hasRecipes = this.hasRecipes.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  /**
   * @method componentDidMount
   *
   * @returns {undefined}
   */
  componentDidMount() {
    const { categoryName } = this.props.match.params;
    const { limit } = this.state;
    const currentPage = localStorage.getItem('currentCategoryPage');
    this.props.fetchRecipesByCategory(currentPage, limit, categoryName)
      .then(() => this.setState({ firstLoad: false, isLoading: false }));
  }

  /**
   * @method componentDidUpdate
   *
   * @returns {undefined}
   */
  componentDidUpdate() {
    materializeJavascript();
  }

  onClick = () => {
    resetPage();
  }

  /**
   * @method setPagination
   *
   * @param {void} void
   *
   * @returns {object} pagination props
   */
  setPagination() {
    if (this.hasRecipes()) {
      const { pagination: { page, pageCount } } = this.props.recipes;
      return {
        page,
        pageCount
      };
    }
    return {
      page: 1,
      pageCount: 1
    };
  }

  /**
   * Toggle smiley from sad face to
   * happy face
   * @method toggleSmiley
   *
   * @returns {undefined}
   */
  toggleSmiley() {
    const { changeSmiley } = this.state;
    this.setState({ changeSmiley: !changeSmiley });
  }

  /**
   * Checks if there are recipes to display
   * @method hasRecipes
   *
   * @returns {boolean} boolean
   */
  hasRecipes() {
    if (isEmpty(this.props.recipes)) {
      return false;
    }
    return !isEmpty(this.props.recipes.recipes);
  }

  /**
  * Handle page selection for pagination
  * @method handlePageClick
  *
  * @param {object} data
  *
  * @returns {void}
  */
  handlePageClick({ selected }) {
    this.setState({ isLoading: true });
    const page = selected + 1;
    const { limit } = this.state;
    localStorage.setItem('currentCategoryPage', page);
    const currentPage = localStorage.getItem('currentCategoryPage');
    const { categoryName } = this.props.match.params;
    this.props.fetchRecipesByCategory(currentPage, limit, categoryName)
      .then(() => this.setState({ isLoading: false }));
  }

  /**
  * Render recipes by category
  * @method renderCategoryRecipes
  *
  * @param {number} index
  *
  * @returns {JSX} JSX
  */
  renderCategoryRecipes = (index) => {
    const recipe = this.props.recipes.recipes[index];
    return (
      <RecipeItem
        grid="l4 m6"
        key={recipe.id}
        index={recipe.id}
        recipe={recipe}
        upvote={this.props.upvoteAction}
        downvote={this.props.downvoteAction}
      />
    );
  }

  /**
  * Render category link items
  * @method renderCategoryRecipes
  *
  * @param {number} index
  *
  * @returns {JSX} JSX
  */
  renderCategoryLinks = (index) => {
    const category = categories[index];
    const { categoryName } = this.props.match.params;
    const linkClass = classnames({ active: category === categoryName });
    return (
      <li key={category}>
        <Link
          to={`/category/${category}`}
          className={`collapsible-header truncate ${linkClass}`}
          onClick={this.onClick}
        >
          {pascalCase(category)}
        </Link>
      </li>
    );
  }

  /**
   * @method renderPagination
   *
   * @param {void} void
   *
   * @returns {JSX} JSX
   */
  renderPagination = () => {
    const { page, pageCount } = this.setPagination();
    return (
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={<i className="fa fa-chevron-left" />}
          nextLabel={<i className="fa fa-chevron-right" />}
          breakLabel={<a href="">...</a>}
          breakClassName={'break-me'}
          pageCount={pageCount}
          initialPage={page - 1}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          disableInitialCallback
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }

  /**
   * Renders the component
   * @method render
   *
   * @returns {JSX} JSX
   */
  render() {
    const { recipes } = this.props.recipes;
    const { isLoading, firstLoad } = this.state;
    const { categoryName } = this.props.match.params;
    return (
      <div id="category-page-container">
        { firstLoad ?
          <Loader /> :
          <div>
            <HomeNavbar />
            <Banner />
            <div>
              <h4 className="center-align category-header">
                {pascalCase(categoryName)}
              </h4>
              <div className="row">
                <div className="col l2 offset-l1 m2 hide-on-small-only">
                  <span className="category-section-header">
                    <b>Categories</b>
                  </span>
                  <p className="divider" />
                  <div className="category">
                    <ul className="collapsible z-depth-0">
                      {categories
                        .map(
                          (category, index) => this.renderCategoryLinks(index)
                        )
                      }
                    </ul>
                  </div>
                </div>
                <div className="col l8 m10" >
                  <span
                    className="recipe-section-header"
                  >
                    <b>Recipes</b>
                  </span>
                  <p className="divider" />
                  <div className="row">
                    {!isLoading ?
                      Object
                        .keys(recipes)
                        .sort((a, b) => b - a)
                        .map(index => this.renderCategoryRecipes(index))
                      :
                      <Loader />
                    }
                  </div>
                  {!this.hasRecipes() &&
                  <div className="center-align">
                    <img
                      id="smiley"
                      src={this.state.changeSmiley ?
                        happySmiley : sad}
                      alt=""
                    />
                    <h6>
                      No recipe has been created for {pascalCase(categoryName)}
                      yet. Care to <Link
                        onMouseEnter={this.toggleSmiley}
                        onMouseLeave={this.toggleSmiley}
                        to="/recipes/new"
                      >add</Link> one?
                    </h6>
                  </div>
                  }
                  {this.hasRecipes() && this.renderPagination()}
                </div>
              </div>
            </div>
            <SideNav />
            <Footer />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ recipes }) => ({
  pagination: recipes.pagination,
  recipes
});

CategoryPage.defaultProps = {
  recipes: {}
};

CategoryPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      categoryName: PropTypes.string.isRequired
    })
  }).isRequired,
  fetchRecipesByCategory: PropTypes.func.isRequired,
  upvoteAction: PropTypes.func.isRequired,
  downvoteAction: PropTypes.func.isRequired,
  recipes: PropTypes.shape({
    recipes: PropTypes.shape({}),
    pagination: PropTypes.shape({})
  })
};

export default connect(mapStateToProps,
  {
    upvoteAction,
    downvoteAction,
    fetchRecipesByCategory
  }
)(CategoryPage);
