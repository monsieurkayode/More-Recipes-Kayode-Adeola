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
      error: '',
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
          this.setState({ error: message })
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
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <TextField 
                  onChange={this.handleInputChange}
                  value={this.state.username}
                  field="username"
                  type="text" 
                  />
                <label htmlFor="username" data-error="">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <TextField 
                  onChange={this.handleInputChange}
                  value={this.state.email}
                  field="email"
                  type="email" 
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">lock_outline</i>
                <TextField 
                  onChange={this.handleInputChange}
                  value={this.state.password}
                  field="password"
                  type="password" 
                />
                <label htmlFor="password" data-error="" data-success="">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <TextField 
                  onChange={this.handleInputChange}
                  value={this.state.confirmPassword}
                  field="confirmPassword"
                  type="password" 
                />
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