import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'proptypes';

import { fetchSingleRecipe } from '../actions/index';
import Footer from './footer/Footer.jsx';
import { Ingredients, Instructions, CommentBox } from './recipeview/Index.jsx';
import { NewPostModal } from './modals/Index.jsx';
import { SideNav } from './main/Index.jsx';
import { HomeNavbar } from './headers/Index.jsx';

class RecipeViewPage extends Component {
  componentWillMount() {
    const { recipeId } = this.props.match.params;
    this.props.fetchSingleRecipe(recipeId);
  }

  componentDidMount() {
    $('.dropdown-button').dropdown();
    $('.button-collapse').sideNav();
    document.body.scrollTop = 0;
  }

  componentDidUpdate() {
    $('.dropdown-button').dropdown();
    $('.button-collapse').sideNav();
    document.body.scrollTop = 0;
  }

  render() {
    const { currentRecipe } = this.props;
    if (isEmpty(currentRecipe)) {
      return <div>Loading....</div>;
    }
    return (
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
                    <a className="chip" href="">
                      <i className="fa fa-thumbs-up" />
                    </a>
                    <a className="chip" href="">
                      <i className="fa fa-thumbs-down " />
                    </a>
                    <a className="chip" href="">
                      <i className="fa fa-heart" />
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SideNav />
        <CommentBox />
        <Footer />
        <NewPostModal />
      </div>
    );
  }
}

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
  }).isRequired
};

const mapStateToProps = ({ currentRecipe }) => ({ currentRecipe });

export default connect(mapStateToProps, { fetchSingleRecipe })(RecipeViewPage);
