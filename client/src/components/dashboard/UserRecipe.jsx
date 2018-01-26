import { isEmpty, has } from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'proptypes';
import ReactPaginate from 'react-paginate';

import { RecipeCardSmall } from '../recipes';
import { WelcomeDisplay } from './';
import { Loader } from '../main';

/**
 * @summary - UserRecipe class declaration
 * @class UserRecipe
 * @extends {Component}
 */
class UserRecipe extends Component {
  /**
   * @method componentWillReceiveProps
   *
   * @param {object} nextProps
   *
   * @returns {*} any
   */
  componentWillReceiveProps(nextProps) {
    const { recipes } = this.props.userRecipes;
    const currentPageSize = Object.keys(recipes || {}).length;
    const nextPageSize = Object.keys(
      nextProps.userRecipes.recipes || {}
    ).length;
    if (currentPageSize !== nextPageSize) {
      const currentPage = localStorage.getItem('currentPageUserRecipes');
      const nextRecipes = this.hasRecipes() && nextProps.userRecipes.recipes;
      if (!Object.keys(nextRecipes || {}).length && currentPage > 1) {
        localStorage.setItem('currentPageUserRecipes', currentPage - 1);
        this.props.isFetching(true, 'UserRecipes');
        return this.props.fetchUserRecipes(currentPage - 1);
      }
      this.props.fetchUserRecipes(currentPage);
    }
  }

  /**
   * @method setPagination
   *
   * @param {void} void
   *
   * @returns {object} pagination props
   */
  setPagination = () => {
    if (this.hasRecipes()) {
      const { pagination: { page, pageCount } } = this.props.userRecipes;
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
   * Check if there is a recipe
   * @method hasFavorites
   *
   * @param {void} void
   *
   * @returns {boolean} boolean
   */
  hasRecipes = () => {
    const { userRecipes } = this.props;
    if (isEmpty(userRecipes)) {
      return false;
    }
    if (!isEmpty(userRecipes) && has(userRecipes, 'recipes')) {
      if (userRecipes.pagination.totalCount === 0) {
        return false;
      }
      return true;
    }
    return true;
  }


  /**
   * Handle page selection for pagination
   * @method handlePageClick
   *
   * @param {object} data
   *
   * @returns {void}
   */
  handlePageClick = ({ selected }) => {
    const page = selected + 1;
    localStorage.setItem('currentPageUserRecipes', page);
    const currentPage = localStorage.getItem('currentPageUserRecipes');
    this.props.isFetching(true, 'UserRecipes');
    this.props.fetchUserRecipes(currentPage, this);
  }

  /**
   * @method renderUserRecipes
   *
   * @param {number} index
   *
   * @returns {JSX} JSX
   */
  renderUserRecipes = (index) => {
    const recipe = this.props.userRecipes.recipes[index];
    const { deletePost, selected, selectRecipe } = this.props;
    return (
      <RecipeCardSmall
        key={recipe.id}
        index={recipe.id}
        recipe={recipe}
        handleAction={deletePost}
        selected={selected}
        selectRecipe={selectRecipe}
      />
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
    const { recipes } = this.props.userRecipes;
    return (
      <div id="user-recipes" className="col l9 m12 s12 offset-l3">
        <WelcomeDisplay />
        <div id="my-recipes" className="row">
          {this.hasRecipes() ?
            <div>
              { this.props.isLoadingRecipes ? <Loader /> :
                Object
                  .keys(recipes)
                  .sort((a, b) => b - a)
                  .map(index => this.renderUserRecipes(index))
              }
            </div> :
            <div className="center-align not-found">
              <img
                src="/css/img/sad_smiley.png"
                alt=""
              />
              <h5>
                There is nothing here, create and share awesome recipes.
              </h5>
            </div>}
        </div>
        {this.hasRecipes() && this.renderPagination()}
      </div>
    );
  }
}

UserRecipe.defaultProps = {
  userRecipes: {},
  deletePost: null
};

UserRecipe.propTypes = {
  userRecipes: PropTypes.shape({
    recipes: PropTypes.shape({
      id: PropTypes.number,
      views: PropTypes.number,
      upvote: PropTypes.number,
      downvote: PropTypes.number,
      recipeName: PropTypes.string,
      category: PropTypes.string,
      ingredients: PropTypes.string,
      instructions: PropTypes.string,
      image: PropTypes.string
    }),
    pagination: PropTypes.shape({
      page: PropTypes.number,
      pageCount: PropTypes.number,
      pageSize: PropTypes.number,
      totalCount: PropTypes.number
    })
  }),
  deletePost: PropTypes.func,
  isFetching: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  selectRecipe: PropTypes.func.isRequired,
  fetchUserRecipes: PropTypes.func.isRequired,
  isLoadingRecipes: PropTypes.bool.isRequired,
};

export default UserRecipe;
