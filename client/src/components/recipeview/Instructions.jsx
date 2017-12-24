import React, { Component } from 'react';
import PropTypes from 'proptypes';
import showdown from 'showdown';

showdown.setFlavor('github');

class Instructions extends Component {
  render() {
    const converter = new showdown.Converter();
    return (
      <div className="col l12 m12 s12">
        <h4>Instructions</h4>
        <div
          id="instructions"
          dangerouslySetInnerHTML={
            { __html: converter.makeHtml(this.props.instructions) }
          }
        />
      </div>
    );
  }
}

Instructions.defaultProps = {
  instructions: ''
};

Instructions.propTypes = {
  instructions: PropTypes.string.isRequired
};

export default Instructions;
