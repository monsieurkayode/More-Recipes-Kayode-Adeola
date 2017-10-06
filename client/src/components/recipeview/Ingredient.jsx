import React, { Component } from 'react';

class Ingredient extends Component {
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

export default Ingredient;