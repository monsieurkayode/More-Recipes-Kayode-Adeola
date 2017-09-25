import React from 'react';

const SignupModal = (props => {
  return(
    <div id="modal-register" className="modal">
      <div classNameName="modal-content">
        <div className="row center-align">
          <div className="col s12 l12 m12">
            <div className="card z-depth-0 white darken-4">
              <div className="card-content blue-grey-text darken-1">
                <h5>Create new Account</h5>
              </div>
            </div>
              <form>
                <div className="row">
                  <div className="input-field col l12 m12 s12">
                    <i className="material-icons prefix">email</i>
                    <input id="email" type="email" className="validate" required />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col l12 m12 s12">
                    <i className="material-icons prefix">account_circle</i>
                    <input id="username" type="text" className="validate" required />
                    <label htmlFor="username" data-error="Username is invalid">Username</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col l12 m12 s12">
                    <i className="material-icons prefix">lock_outline</i>
                    <input id="password" type="password" className="validate" required />
                    <label htmlFor="password" data-error="Invalid password" data-success="Strong password">Password</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col l12 m12 s12">
                    <i className="material-icons prefix">lock</i>
                    <input id="confirm-password" type="password" className="validate" required />
                    <label htmlFor="confirm-password">Confirm Password</label>
                  </div>
                </div>
                <div className="col s12 l12 m12">
                  <a href="dashboard.html" className="btn waves-effect waves-light white-text right">Submit
                    <i className="material-icons right">send</i>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
});

export default SignupModal;