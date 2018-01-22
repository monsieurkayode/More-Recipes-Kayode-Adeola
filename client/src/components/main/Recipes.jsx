import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';
import isEmpty from 'lodash/isEmpty';
import ReactPaginate from 'react-paginate';

import {
  upvoteAction,
  downvoteAction,
  fetchRecipesAction
} from '../../actions';
import { RecipeItem, Loader } from './';

class Recipes extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false
    };
  }
  handlePageClick = ({ selected }) => {
    this.setState({ isLoading: true });
    const page = selected + 1;
    localStorage.setItem('currentPage', page);
    const currentPage = localStorage.getItem('currentPage');
    this.props.fetchRecipesAction(currentPage)
      .then(() => this.setState({ isLoading: false }));
  }

  hasRecipes = () => !isEmpty(this.props.recipes)

  renderRecipes = (index) => {
    const recipe = this.props.recipes[index];
    return (
      <RecipeItem
        key={recipe.id}
        index={recipe.id}
        recipe={recipe}
        upvote={this.props.upvoteAction}
        downvote={this.props.downvoteAction}
      />
    );
  }

  renderPagination = () => {
    const { pagination: { page, pageCount } } = this.props;
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

  render() {
    const { pagination: { page, pageCount }, isAuthenticated } = this.props;
    const { isLoading } = this.state;
    return (
      <div className="col l5 m6 s12">
        <span>You are viewing page { page || 1 } of { pageCount || 1}</span>
        <p className="divider" />
        <div className="row">
          {this.hasRecipes() ?
            <div>
              {isLoading ? <Loader /> :
                Object
                  .keys(this.props.recipes)
                  .sort((a, b) => b - a)
                  .map(index => this.renderRecipes(index))}
            </div> :
            <div className="center-align not-found">
              <img
                src="/css/img/sad_smiley.png"
                alt=""
              />
              <h6>
                No recipe matches your search! Try again with another keyword
              </h6>
            </div>
          }
        </div>
        {this.hasRecipes() && isAuthenticated && this.renderPagination()}
      </div>
    );
  }
}

const mapStateToProps = ({ recipes, signinState }) => ({
  recipes: recipes.recipes,
  pagination: recipes.pagination,
  isAuthenticated: signinState.isAuthenticated
});

Recipes.defaultProps = {
  recipes: {},
  pagination: {}
};

Recipes.propTypes = {
  recipes: PropTypes.shape({}).isRequired,
  upvoteAction: PropTypes.func.isRequired,
  downvoteAction: PropTypes.func.isRequired,
  fetchRecipesAction: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number,
    pageSize: PropTypes.number,
    pageCount: PropTypes.number,
    totalCount: PropTypes.number
  }),
  isAuthenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps,
  { upvoteAction, downvoteAction, fetchRecipesAction }
)(Recipes);
