import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'proptypes';
import Avatar from 'react-avatar';

import dash from '../../../assets/css/img/dash.jpg';

/**
 * SideNavDashboard
 * @function SideNavDashboard
 *
 * @param {object} props
 *
 * @return {JSX} JSX
 */
const SideNavDashboard = props => (
  <div className="side-nav" id="dashboard">
    <div id="dash-panel" className="col l3 teal">
      <div className="teal">
        <div
          id="profile-page-header"
          className="card teal z-depth-0"
        >
          <div className="card-image">
            <img
              className="responsive-img"
              id="dash-img"
              src={dash}
              alt="user-background"
            />
            <div className="card-profile-image">
              <Avatar
                className="card-profile-avatar responsive-img"
                name={props.user.username}
                size={80}
                color="#345"
                round
              />
            </div>
          </div>
          <div id="dash-links">
            <div className="collection">
              <a
                id="dashboard-parent"
                className="collection-item teal"
              >
                <strong>
                   Dashboard
                </strong>
              </a>
              <br />
              <div id="myTab" className="tabs-vertical">
                <ul className="tabs teal">
                  <li className="tab">
                    <Link
                      to="/dashboard/profile"
                      className="white-text"
                    >
                      <i
                        className="fa fa-vcard-o white-text"
                      /> My Profile
                    </Link>
                  </li>
                  <li className="tab">
                    <Link
                      to="/dashboard/recipes"
                      className="white-text"
                    >
                      <i
                        className="fa fa-briefcase white-text"
                      /> My Recipes
                    </Link>
                  </li>
                  <li className="tab">
                    <Link
                      to="/dashboard/favorites"
                      className="white-text"
                    >
                      <i
                        className="fa fa-heart white-text"
                      /> Favorite Recipes
                    </Link>
                  </li>
                  <li className="tab">
                    <Link
                      to="/dashboard/notifications"
                      className="white-text"
                    >
                      <i
                        className="fa fa-comments-o white-text"
                      /> Notifications
                      <span
                        id="not-badge"
                        className="red new badge"
                      >10</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

SideNavDashboard.defaultProps = {
  user: {}
};

SideNavDashboard.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string
  }),
};

export default SideNavDashboard;
