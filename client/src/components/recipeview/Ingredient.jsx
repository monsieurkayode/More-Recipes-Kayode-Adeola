import React, { Component } from 'react';

class Ingredient extends Component {
  render() {
    return (
      <li>{this.props.children}</li>
    );
  }
}

export default Ingredient;