import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CategoryCollection } from './Index';

class Category extends Component {
  renderCategory = (key) => {
    const recipe = this.props.recipes[key];
    return (
      <CategoryCollection key={recipe.id} recipe={recipe} />
    )
  }

  render() {
    return (
      <div className="col l2 offset-l1 m2 hide-on-small-only">
        <span className="">Category</span>
        <p className="divider"></p>
        <div id="category">
          <ul className="collapsible z-depth-0" data-collapsible="accordion">
            {Object.keys(this.props.recipes).map((key) => this.renderCategory(key))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ recipes }) => {
  return { recipes };
}

export default connect(mapStateToProps)(Category);