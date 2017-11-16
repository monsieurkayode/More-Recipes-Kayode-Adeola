import React, { Component } from 'react';

class Instructions extends Component {
  render() {
    return (
      <div className="col l12 m12 s12">
        <h4>Instructions</h4>
        <p>
          {this.props.instructions}
        </p>
      </div>
    );
  }
}

export default Instructions;