import React, { Component } from 'react';
import PropTypes from 'proptypes';
import showdown from 'showdown';

showdown.setFlavor('github');

class Ingredients extends Component {
  render() {
    const converter = new showdown.Converter();
    return (
      <div className="col l3 m4 s12 offset-l1">
        <span className=""><h5>Ingredients</h5></span>
        <p className="divider" />
        <div
          dangerouslySetInnerHTML={{ __html: converter.makeHtml(this.props.ingredients) }}
        />
      </div>
    );
  }
}

Ingredients.defaultProps = {
  ingredients: ''
};

Ingredients.propTypes = {
  ingredients: PropTypes.string.isRequired
};
export default Ingredients;
