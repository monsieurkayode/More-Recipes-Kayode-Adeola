import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';
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
        this.props.history.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = ({ signinState }) => ({
    user: signinState.user,
    isAuthenticated: signinState.isAuthenticated
  });

  Authenticate.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    fetchRecipesAction: PropTypes.func.isRequired
  };
  return connect(mapStateToProps, { fetchRecipesAction })(Authenticate);
}
