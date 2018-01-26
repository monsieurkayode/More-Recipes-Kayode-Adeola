import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';

/**
 * Authentication HOC
 *
 * @param {JSX} ComposedComponent
 *
 * @returns {JSX} JSX
 */
export default function (ComposedComponent) {
  /**
 * @summary - Authenticate class declaration
 * @class Authenticate
 * @extends {Component}
 */
  class Authenticate extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/signin');
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
  };
  return connect(mapStateToProps)(Authenticate);
}
