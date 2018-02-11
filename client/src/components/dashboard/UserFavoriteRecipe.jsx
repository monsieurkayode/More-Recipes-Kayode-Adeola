import { isEmpty, has } from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'proptypes';
import ReactPaginate from 'react-paginate';

import { Loader } from '../main';
import { WelcomeDisplay } from './';
import { RecipeCardSmall } from '../recipes';

/**
 * @summary - UserFavoriteRecipe class declaration
 * @class UserFavoriteRecipe
 * @extends {Component}
 */
class UserFavoriteRecipe extends Component {
  /**
   * Component constructor
   * @param {object} props
   * @memberOf UserFavoriteRecipe
   */
  constructor(props) {
    super(props);
    this.setPagination = this.setPagination.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  /**
   * @method componentWillReceiveProps
   *
   * @param {object} nextProps
   *
   * @returns {*} any
   */
  componentWillReceiveProps(nextProps) {
    const { recipes } = this.props.userFavorites;
    const currentPageSize = Object.keys(recipes || {}).length;
    const nextPageSize = Object.keys(
      nextProps.userFavorites.recipes || {}
    ).length;
    if (currentPageSize !== nextPageSize) {
      const currentPage = localStorage.getItem('currentPageUserFavorites');
      const nextFavorites = this.hasFavorites() &&
        nextProps.userFavorites.recipes;
      if (!Object.keys(nextFavorites || {}).length && currentPage > 1) {
        localStorage.setItem('currentPageUserFavorites', currentPage - 1);
        this.props.isFetching(true, 'UserFavorites');
        return this.props.fetchUserFavorites(currentPage - 1);
      }
      this.props.fetchUserFavorites(currentPage);
    }
  }

  /**
   * @method setPagination
   *
   * @param {void} void
   *
   * @returns {object} pagination props
   */
  setPagination() {
    if (this.hasFavorites()) {
      const { pagination: { page, pageCount } } = this.props.userFavorites;
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
   * Check if there is a favorite
   * @method hasFavorites
   *
   * @param {void} void
   *
   * @returns {boolean} boolean
   */
  hasFavorites = () => {
    const { userFavorites } = this.props;
    if (isEmpty(userFavorites)) {
      return false;
    }
    if (!isEmpty(userFavorites) && has(userFavorites, 'recipes')) {
      if (!userFavorites.pagination.totalCount) {
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
  handlePageClick({ selected }) {
    const page = selected + 1;
    localStorage.setItem('currentPageUserFavorites', page);
    const currentPage = localStorage.getItem('currentPageUserFavorites');
    this.props.isFetching(true, 'UserFavorites');
    this.props.fetchUserFavorites(currentPage);
  }

  /**
   * @method renderUserFavorites
   *
   * @param {number} index
   *
   * @returns {JSX} JSX
   */
  renderUserFavorites = (index) => {
    const recipe = this.props.userFavorites.recipes[index];
    const { removeFavorite, selectRecipe } = this.props;
    return (
      <RecipeCardSmall
        key={recipe.id}
        index={recipe.id}
        recipe={recipe.Recipe}
        handleAction={removeFavorite}
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
    const { recipes } = this.props.userFavorites;
    return (
      <div id="favorite-recipes" className="col l9 m12 s12 offset-l3">
        <WelcomeDisplay selected={this.props.selected} />
        <div id="user-favorites" className="row">
          <div className="row">
            {this.hasFavorites() ?
              <div>
                { this.props.isLoadingFavorites ? <Loader /> :
                  Object
                    .keys(recipes)
                    .sort((a, b) => b - a)
                    .map(index => this.renderUserFavorites(index))
                }
              </div> :
              <div className="center-align not-found">
                <img
                  src="/css/img/sad.png"
                  alt=""
                />
                <h5>
                  You have not added any favorites.
                </h5>
              </div>}
          </div>
        </div>
        {this.hasFavorites() && this.renderPagination()}
      </div>
    );
  }
}

UserFavoriteRecipe.defaultProps = {
  userFavorites: {},
  removeFavorite: null
};

UserFavoriteRecipe.propTypes = {
  userFavorites: PropTypes.shape({
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
  removeFavorite: PropTypes.func,
  selected: PropTypes.string.isRequired,
  selectRecipe: PropTypes.func.isRequired,
  fetchUserFavorites: PropTypes.func.isRequired,
  isFetching: PropTypes.func.isRequired,
  isLoadingFavorites: PropTypes.bool.isRequired
};

export default UserFavoriteRecipe;
