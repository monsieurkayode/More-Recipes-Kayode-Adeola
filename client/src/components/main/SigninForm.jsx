import React, { Component } from 'react';
import axios from 'axios';
import { TextField } from './Index';

class SigninForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    const user = {...this.state}
    axios.post('/api/v1/users/signin', user)
      .then((response) => {
        const { Token } = response.data
        localStorage.setItem('token', Token)
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
      <div onSubmit={this.handleSubmit} className="container">
        <div className="row">
          <form className="col l6 m8 s12 offset-l3 offset-m2">
            <TextField 
              onChange={this.handleInputChange}
              value={this.state.username}
              field="username"
              type="text"
              icon="account_circle"
              label="Username" />

            <TextField 
              onChange={this.handleInputChange}
              value={this.state.password}
              field="password"
              type="password"
              icon="lock_outline"
              label="Password" />

            <div className="col s12 m12 l12 center-align">
              <button className="btn waves-effect waves-light" type="submit">Login
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SigninForm;