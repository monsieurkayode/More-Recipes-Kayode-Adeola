import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';

import { signinAction } from '../../actions';
import { TextField } from './';

/**
 * @summary - SigninForm class declaration
 * @class SigninForm
 * @extends {Component}
 */
export class SigninForm extends Component {
  /**
   * Component constructor
   * @param {object} props
   * @memberOf SigninForm
   */
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  /**
   * @method componentWillMount
   *
   * @returns {undefined}
   */
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.history.goBack();
    }
  }

  /**
   * @method componentWillUpdate
   *
   * @param {object} nextProps
   *
   * @returns {void}
   */
  componentWillUpdate(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  /**
   * Handle input change
   * @method handleInputChange
   *
   * @param {object} event
   *
   * @returns {void}
   */
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Hanlde Submit
   * @method handleSubmit
   *
   * @param {object} event
   *
   * @returns {void}
   */
  handleSubmit = (event) => {
    const user = { ...this.state };
    event.preventDefault();
    this.props.signinAction(user);
  }

  /**
   * Renders the component
   * @method render
   *
   * @returns {JSX} JSX
   */
  render() {
    return (
      <div onSubmit={this.handleSubmit} className="container">
        <div className="row">
          <form className="col l6 m8 s12 offset-l3 offset-m2">
            <TextField
              onChange={this.handleInputChange}
              value={this.state.username}
              field="username"
              type="text"
              icon="account_circle"
              label="Username"
            />

            <TextField
              onChange={this.handleInputChange}
              value={this.state.password}
              field="password"
              type="password"
              icon="lock_outline"
              label="Password"
            />

            <div className="col s12 m12 l12 center-align">
              <button className="btn waves-effect waves-light" type="submit">
                Login
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ signinState }) => {
  const { isAuthenticated } = signinState;
  return { isAuthenticated };
};

SigninForm.propTypes = {
  signinAction: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  }).isRequired
};

export default connect(mapStateToProps, { signinAction })(SigninForm);
