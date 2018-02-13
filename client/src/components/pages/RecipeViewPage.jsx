import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';
import isEmpty from 'lodash/isEmpty';

import {
  fetchSingleRecipe,
  upvoteAction,
  downvoteAction,
  addFavoriteAction,
  fetchSingleFavorite,
  fetchReviews,
  removeFavorite,
} from '../../actions';
import Footer from '../footer';
import {
  Ingredients,
  Instructions,
  CommentBox,
  Comments
} from '../recipeview';
import { SideNav, Loader } from '../main';
import { HomeNavbar } from '../headers';

/**
 * @summary - RecipeViewPage class declaration
 * @class RecipeViewPage
 * @extends {Component}
 */
export class RecipeViewPage extends Component {
  /**
   * Component constructor
   * @param {object} props
   * @memberOf RecipeViewPage
   */
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
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
    const { recipeId } = this.props.match.params;
    this.props.fetchSingleRecipe(recipeId)
      .then(() => this.setState({
        isLoading: false
      }));
    this.props.fetchSingleFavorite(recipeId);
    this.props.fetchReviews(recipeId);
    window.scroll(0, 0);
  }

  /**
   * @method shouldComponentUpdate
   *
   * @param {object} nextProps
   *
   * @returns {void}
   */
  shouldComponentUpdate(nextProps) {
    return !isEmpty(nextProps.currentRecipe);
  }

  /**
   * @method componentDidUpdate
   *
   * @param {void} void
   *
   * @returns {void}
   */
  componentDidUpdate() {
    $('.dropdown-button').dropdown();
    $('.button-collapse').sideNav({
      closeOnClick: true,
      draggable: false
    });
    $('.materialboxed').materialbox();
  }

  /**
   * Render reviews
   * @method renderReviews
   *
   * @param {number} index
   *
   * @returns {void}
   */
  renderReviews = (index) => {
    const review = this.props.reviews[index];
    return (
      <Comments
        key={review.id}
        index={review.id}
        review={review}
      />
    );
  }

  /**
   * Renders the component
   * @method render
   *
   * @returns {JSX} JSX
   */
  render() {
    const { currentRecipe, reviews, isFavorite } = this.props;
    const favorited = isFavorite ? 'orange-text' : '';
    const { isLoading } = this.state;
    const handleAction = isFavorite ? this.props.removeFavorite :
      this.props.addFavoriteAction;
    return (
      <div>
        { isLoading ?
          <Loader /> :
          <div>
            <HomeNavbar user={this.props.user} />
            <div id="recipe-img" className="hide-on-small-only">
              <div className="card z-depth-0">
                <div className="card-image">
                  <img
                    className="responsive-img"
                    src={currentRecipe.image}
                    alt={currentRecipe.recipeName}
                  />
                  <span className="card-title">{currentRecipe.recipeName}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <Ingredients ingredients={currentRecipe.ingredients} />
              <div className="col l7 m8 s12">
                <div className="row">
                  <Instructions instructions={currentRecipe.instructions} />
                </div>
                <div className="col l12 m12 s12">
                  <div className="card recipe-view">
                    <div className="card-image">
                      <img
                        className="materialboxed"
                        src={currentRecipe.image}
                        alt=""
                      />
                      <span className="card-title right">
                        <div
                          onClick={() => this.props.upvoteAction(
                            currentRecipe.id
                          )}
                          className="chip boxReaction"
                        >
                          <i className="fa fa-thumbs-up" /> {
                            currentRecipe.upvote
                          }
                        </div>
                        <div
                          onClick={() => this.props.downvoteAction(
                            currentRecipe.id
                          )}
                          className="chip boxReaction"
                        >
                          <i className="fa fa-thumbs-down " /> {
                            currentRecipe.downvote
                          }
                        </div>
                        <div
                          onClick={() => handleAction(
                            currentRecipe.id
                          )}
                          className="chip boxReaction"
                        >
                          <i className={`fa fa-heart ${favorited}`} />
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <CommentBox />
            <div id="comment-posts" className="row">
              <div className="col l7 m8 s12 offset-l4 offset-m4">
                {
                  Object
                    .keys(reviews).sort((a, b) => b - a)
                    .map(index =>
                      this.renderReviews(index))
                }
                {!isEmpty(Object.keys(reviews)) &&
                <div className="center-align">
                  <span
                    id="view-more"
                    className="chip edit"
                  >
                    View more
                  </span>
                </div>}
              </div>
            </div>
            <SideNav />
            <Footer />
          </div>}
      </div>
    );
  }
}

RecipeViewPage.defaultProps = {
  reviews: {}
};

RecipeViewPage.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string
    })
  }).isRequired,
  fetchSingleRecipe: PropTypes.func.isRequired,
  currentRecipe: PropTypes.shape({
    id: PropTypes.number,
    views: PropTypes.number,
    upvote: PropTypes.number,
    downvote: PropTypes.number,
    recipeName: PropTypes.string,
    category: PropTypes.string,
    ingredients: PropTypes.string,
    instructions: PropTypes.string,
    image: PropTypes.string
  }).isRequired,
  upvoteAction: PropTypes.func.isRequired,
  downvoteAction: PropTypes.func.isRequired,
  addFavoriteAction: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  fetchSingleFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  fetchReviews: PropTypes.func.isRequired,
  reviews: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    comment: PropTypes.string,
    User: PropTypes.shape({
      username: PropTypes.string
    })
  })
};

const mapStateToProps = ({ currentRecipe, isFavorite, reviews }) => ({
  currentRecipe,
  isFavorite,
  reviews: reviews.comments,
  pagination: reviews.pagination
});

export default connect(mapStateToProps,
  {
    fetchSingleRecipe,
    upvoteAction,
    downvoteAction,
    addFavoriteAction,
    fetchSingleFavorite,
    fetchReviews,
    removeFavorite,
  }
)(RecipeViewPage);
