import React, { Component } from 'react';
import axios from 'axios';
import { TextField } from './Index';

class SignupForm extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`token`, nextState.token)
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    const user = {...this.state}
    axios.post('/api/v1/users/signup', user)
      .then((response) => {
        const { token } = response.data
        this.setState({ token })
      })
      .catch((error) => {
        if (error.response) {
          const { message } = error.response.data;
          alert(message);
        }
      })
    event.preventDefault();
  }

  render() {
    return (
      <div id="form" className="container">
        <div className="row">
          <form onSubmit={this.handleSubmit} className="col l6 m8 s12 offset-l3 offset-m2">
            <TextField 
              onChange={this.handleInputChange}
              value={this.state.username}
              field="username"
              type="text"
              icon="account_circle"
              label="Username" />

            <TextField 
              onChange={this.handleInputChange}
              value={this.state.email}
              field="email"
              type="email"
              icon="email"
              label="Email" />
          
            <TextField 
              onChange={this.handleInputChange}
              value={this.state.password}
              field="password"
              type="password"
              icon="lock_outline"
              label="Password" />

            <TextField 
              onChange={this.handleInputChange}
              value={this.state.confirmPassword}
              field="confirmPassword"
              type="password"
              icon="lock"
              label="Confirm Password" />

            <div className="center-align">
              <button id="submit-btn" className="btn waves-effect waves-light">Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignupForm;