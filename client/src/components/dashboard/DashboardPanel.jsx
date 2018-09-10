import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'proptypes';
import Avatar from 'react-avatar';

import dash from '../../../assets/css/img/dash.jpg';

/**
 * DashboardPanel
 * @function DashboardPanel
 *
 * @param {object} props
 *
 * @return {JSX} JSX
 */
const DashboardPanel = props => (
  <div
    id="dash-panel"
    className="col l3 teal hide-on-med-and-down"
  >
    <div id="profile-page-header" className="card teal z-depth-0">
      <div className="card-image">
        <img
          className="responsive-img"
          id="dash-img"
          src={dash}
          alt="user-background"
        />
        <div className="card-profile-image">
          <Avatar
            className="card-profile-avatar"
            name={props.user.username}
            size={80}
            color="#345"
            round
          />
        </div>
      </div>
      <div id="dash-links" >
        <div className="collection">
          <a
            id="dashboard-parent"
            className="collection-item teal"
          >
            <strong>
              <span className="fa fa-dashboard" /> Dashboard
            </strong>
          </a>
          <br />
          <div id="myTab" className="tabs-vertical">
            <ul className="tabs teal">
              <li className="tab">
                <Link
                  className={`white-text 
                    ${props.route === 'profile' && 'active'}`
                  }
                  to="/dashboard/profile"
                >
                  <i className="fa fa-vcard-o" /> My Profile
                </Link>
              </li>
              <li className="tab">
                <Link
                  to="/dashboard/recipes"
                  className={`white-text
                    ${props.route === 'recipes' && 'active'}`
                  }
                >
                  <i className="fa fa-briefcase" /> My Recipes
                </Link>
              </li>
              <li className="tab">
                <Link
                  to="/dashboard/favorites"
                  className={`white-text 
                    ${props.route === 'favorites' && 'active'}`
                  }
                >
                  <i className="fa fa-heart" /> Favorite Recipes
                </Link>
              </li>
              <li className="tab">
                <Link
                  to="/dashboard/notifications"
                  className={`white-text 
                    ${props.route === 'notifications' && 'active'}`
                  }
                >
                  <i className="fa fa-comments-o" /> Notifications
                  <span id="not-badge" className="red new badge">10</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

DashboardPanel.defaultProps = {
  user: {}
};

DashboardPanel.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string
  }),
  route: PropTypes.string.isRequired
};

export default DashboardPanel;
