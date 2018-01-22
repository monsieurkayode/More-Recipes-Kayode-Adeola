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

class RecipeViewPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    };
  }
  componentWillMount() {
    const { recipeId } = this.props.match.params;
    this.props.fetchSingleRecipe(recipeId)
      .then(() => this.setState({
        isLoading: false
      }));
    this.props.fetchSingleFavorite(recipeId);
    this.props.fetchReviews(recipeId);
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  shouldComponentUpdate(nextProps) {
    return !isEmpty(nextProps.currentRecipe);
  }

  componentDidUpdate() {
    $('.dropdown-button').dropdown();
    $('.button-collapse').sideNav();
    $('.materialboxed').materialbox();
  }

  renderReviews = (index) => {
    const review = this.props.reviews[index];
    return (<Comments
      key={review.id}
      index={review.id}
      review={review}
    />);
  }

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
                    src={`/uploads/${currentRecipe.image}`}
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
                        src={`/uploads/${currentRecipe.image}`}
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
                {Object.keys(reviews).sort((a, b) => b - a).map(index =>
                  this.renderReviews(index))}
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
  reviews: PropTypes.shape({}).isRequired
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
