import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipesAction } from '../actions';

export default function (ComposedComponent) {
  class Authenticate extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/signin');
      }
      if (this.props.isAuthenticated) {
        this.props.fetchRecipesAction();
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/')
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = ({ signinState }) => {
    return { 
      user: signinState.user,
      isAuthenticated: signinState.isAuthenticated
    }
  }
  return connect(mapStateToProps, { fetchRecipesAction })(Authenticate);
}
