import React, { Component } from 'react';
import userImg from '../../build/static/css/img/user.jpg';

class UserProfile extends Component {
  render() {
    return (
      <div id="user-profile" class="col l9 m12 s12 offset-l3">
        <WelcomeDisplay />
        <div id="my-profile" className="row"> 
          <div className="col l12 m12 s12">
            <div className="row">
              <div className="col l4 m4">
                <div className="card z-depth-2">
                  <div className="card-image">
                    <img className="responsive-img" src={userImg} alt="" />
                  </div>
                </div>
              </div>
              <div className="col l8 m8 s12">
                <form id="profile-form">
                  <div className="browser-default">
                    <label htmlFor="name">First Name</label>
                    <input type="text" id="first-name" />
                  </div>
                  <div className="browser-default">
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" />
                  </div>
                  <div className="browser-default">
                    <label htmlFor="handle">Public Display Name</label>
                    <input type="text" id="handle" />
                  </div>
                  <div className="browser-default">
                    <label htmlFor="about-me">About Me</label>
                    <textarea id="about-me"></textarea>
                  </div>
                  <a className="btn right blue" href=""><i className="fa fa-save"></i> Save Profile Details</a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;