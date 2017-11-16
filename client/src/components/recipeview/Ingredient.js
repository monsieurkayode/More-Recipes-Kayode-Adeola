import React, { Component } from 'react';

class Ingredient extends Component {
  render() {
    return (
      <li>{this.props.ingredient}</li>
    );
  }
}

export default Ingredient;