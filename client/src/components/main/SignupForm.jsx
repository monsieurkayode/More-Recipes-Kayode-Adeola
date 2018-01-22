import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';

import { signupAction } from '../../actions';
import validateInput from '../../utils/helper';
import { TextField } from './';

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const user = { ...this.state };
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.signupAction(user, () => {
        this.props.history.push('/dashboard');
      });
    }
  }

  render() {
    const { username, email, password, confirmPassword } = this.state.errors;
    return (
      <div id="form" className="container">
        <div className="row">
          <form
            onSubmit={this.handleSubmit}
            className="col l6 m8 s12 offset-l3 offset-m2"
          >
            <TextField
              onChange={this.handleInputChange}
              value={this.state.username}
              error={username}
              field="username"
              type="text"
              icon="account_circle"
              label="Username"
            />

            <TextField
              onChange={this.handleInputChange}
              value={this.state.email}
              error={email}
              field="email"
              type="email"
              icon="email"
              label="Email"
            />

            <TextField
              onChange={this.handleInputChange}
              value={this.state.password}
              error={password}
              field="password"
              type="password"
              icon="lock_outline"
              label="Password"
            />

            <TextField
              onChange={this.handleInputChange}
              value={this.state.confirmPassword}
              error={confirmPassword}
              field="confirmPassword"
              type="password"
              icon="lock"
              label="Confirm Password"
            />

            <div className="center-align">
              <button
                id="submit-btn"
                className="btn waves-effect waves-light"
              >Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ signupState }) => {
  const { success, message } = signupState;
  return {
    success,
    message
  };
};

SignupForm.propTypes = {
  signupAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(mapStateToProps, { signupAction })(SignupForm);
