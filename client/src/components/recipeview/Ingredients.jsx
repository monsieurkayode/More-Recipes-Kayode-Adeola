import React from 'react';
import PropTypes from 'proptypes';
import showdown from 'showdown';

showdown.setFlavor('github');

/**
 * Ingredients
 * @function Ingredients
 *
 * @param {object} props
 *
 * @return {JSX} JSX
 */
const Ingredients = (props) => {
  const converter = new showdown.Converter();
  return (
    <div className="col l3 m4 s12 offset-l1">
      <span className=""><h5>Ingredients</h5></span>
      <p className="divider" />
      <div
        id="ingredients"
        // eslint-disable-next-line
        dangerouslySetInnerHTML={
          { __html: converter.makeHtml(props.ingredients) }
        }
      />
    </div>
  );
};

Ingredients.defaultProps = {
  ingredients: ''
};

Ingredients.propTypes = {
  ingredients: PropTypes.string.isRequired
};
export default Ingredients;
