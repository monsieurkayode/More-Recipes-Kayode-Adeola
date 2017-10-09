import React, { Component } from 'react';
import axios from 'axios';

class SignupForm extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    const user = {...this.state}
    axios.post('/api/v1/users/signup', user)
    event.preventDefault();
  }

  render() {
    return (
      <div id="form" className="container">
        <div className="row">
          <form onSubmit={this.handleSubmit} className="col l6 m8 s12 offset-l3 offset-m2">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input
                  onChange={this.handleInputChange}
                  value={this.state.email}
                  name="email"
                  type="email"
                  className="validate"
                  required />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <input
                  onChange={this.handleInputChange}
                  value={this.state.username}
                  name="username"
                  type="text"
                  className="validate"
                  required />
                <label htmlFor="username" data-error="">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">lock_outline</i>
                <input
                  onChange={this.handleInputChange}
                  value={this.state.password}
                  name="password"
                  type="password"
                  className="validate" 
                  required />
                <label htmlFor="password" data-error="" data-success="">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input
                  onChange={this.handleInputChange}
                  value={this.state.confirmPassword}
                  name="confirmPassword"
                  type="password"
                  className="validate"
                  required />
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>
            </div>
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