import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';

import { routeAction } from '../../actions';
import dash from '../../../assets/css/img/dash.jpg';
import holderProfile from '../../../assets/css/img/holder-profile.png';


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
        <figure className="card-profile-image">
          <img
            src={holderProfile}
            alt=""
            className="z-depth-2 responsive-img"
          />
        </figure>
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
                <a
                  className="white-text"
                  onClick={() => { props.routeAction('profile'); }}
                >
                  <i className="fa fa-vcard-o" /> My Profile
                </a>
              </li>
              <li className="tab">
                <a
                  className="white-text"
                  onClick={() => { props.routeAction('recipes'); }}
                >
                  <i className="fa fa-briefcase" /> My Recipes
                </a>
              </li>
              <li className="tab">
                <a
                  className="white-text"
                  onClick={() => { props.routeAction('favorites'); }}
                >
                  <i className="fa fa-heart" /> Favorite Recipes
                </a>
              </li>
              <li className="tab">
                <a
                  className="white-text"
                >
                  <i className="fa fa-comments-o" /> Notifications
                  <span id="not-badge" className="red new badge">10</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

DashboardPanel.propTypes = {
  routeAction: PropTypes.func.isRequired,
};

export default connect(null, { routeAction })(DashboardPanel);
