import React from 'react';
import PropTypes from 'proptypes';
import showdown from 'showdown';

showdown.setFlavor('github');

/**
 * Instructions
 * @function Instructions
 *
 * @param {object} props
 *
 * @return {JSX} JSX
 */
const Instructions = (props) => {
  const converter = new showdown.Converter();
  return (
    <div className="col l12 m12 s12">
      <h4>Instructions</h4>
      <div
        id="instructions"
        // eslint-disable-next-line
        dangerouslySetInnerHTML={
          { __html: converter.makeHtml(props.instructions) }
        }
      />
    </div>
  );
};

Instructions.defaultProps = {
  instructions: ''
};

Instructions.propTypes = {
  instructions: PropTypes.string.isRequired
};

export default Instructions;
