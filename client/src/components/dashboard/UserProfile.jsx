import React, { Component } from 'react';
import PropTypes from 'proptypes';

import holderProfile from '../../../assets/css/img/holder-profile.png';
import { WelcomeDisplay } from './';

/**
 * @summary - UserProfile class declaration
 * @class UserProfile
 * @extends {Component}
 */
class UserProfile extends Component {
  /**
   * Renders the component
   * @method render
   *
   * @returns {JSX} JSX
   */
  render() {
    const { username } = this.props.user;
    return (
      <div id="user-profile" className="col l9 m12 s12 offset-l3">
        <WelcomeDisplay selected={this.props.selected} />
        <div id="my-profile" className="row">
          <div className="col l12 m12 s12">
            <div className="row">
              <div className="col l4 m4">
                <div className="card z-depth-2">
                  <div className="card-image">
                    <img
                      className="responsive-img"
                      src={holderProfile}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col l8 m8 s12">
                <form id="profile-form">
                  <div className="browser-default">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" />
                  </div>
                  <div className="browser-default">
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" />
                  </div>
                  <div className="browser-default">
                    <label htmlFor="handle">Public Display Name</label>
                    <input
                      type="text"
                      id="handle"
                      defaultValue={`@${username}`}
                      disabled
                    />
                  </div>
                  <div className="browser-default">
                    <label htmlFor="about-me">About Me</label>
                    <textarea id="about-me" />
                  </div>
                  <a className="btn right blue" href="">
                    <i className="fa fa-save" /> Save Profile Details
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired,
  selected: PropTypes.string.isRequired,
};

export default UserProfile;
