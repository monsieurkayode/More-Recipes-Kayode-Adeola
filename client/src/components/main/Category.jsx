import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CategoryCollection } from './Index.jsx';
import Categories from '../../../../server/helpers/categories';
import pascalCase from '../../utils/pascalCase';

class Category extends Component {
  renderCategory = (key) => {
    const category = Categories[key];
    return (
      <CategoryCollection key={key} category={pascalCase(category)} />
    );
  }

  render() {
    return (
      <div className="col l2 offset-l1 m2 hide-on-small-only">
        <span className="">Category</span>
        <p className="divider" />
        <div id="category">
          <ul className="collapsible z-depth-0" data-collapsible="accordion">
            {Categories.map((category, index) => this.renderCategory(index))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ recipes }) => ({ recipes });

export default connect(mapStateToProps)(Category);
