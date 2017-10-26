import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopRecipeItem from './TopRecipeItem';

class TopRecipes extends Component {
  renderTopRecipes = (key) => {
    const recipe = this.props.recipes[key];
    return (
      <TopRecipeItem key={recipe.id} recipe={recipe} />
    )
  }

  render() {
    return (
      <div className="col l3 m4 s12">
        <span>Top of the Week</span>
        <p className="divider"></p>
        <div id="trending">
          <ul className="collection">
            {Object.keys(this.props.recipes).map((key) =>
            this.renderTopRecipes(key))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ recipes }) =>{
  return { recipes };
}

export default connect(mapStateToProps)(TopRecipes);