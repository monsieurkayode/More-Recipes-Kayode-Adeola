import React, { Component } from 'react';
import dashImg from '../../build/static/css/img/dash.jpg';
import userImg from '../../build/static/css/img/user.jpg';

class SideNavDashboard extends Component {
  render() {
    return (
      <ul className="side-nav" id="dashboard">
        <div id="dash-panel" className="col l3 teal darken-2">
          <div className="teal darken-2">
            <div id="profile-page-header" className="card teal darken-2 z-depth-0">
              <div className="card-image">
                <img className="responsive-img" id="dash-img" src={dashImg} alt="user-background" />
                <figure className="card-profile-image">
                  <img src={userImg} alt="" className="z-depth-2 responsive-img" />
                </figure>
              </div>
              <div id="dash-links" >
                <div className="collection">
                  <a id="dashboard-parent" href="" className="collection-item"><strong>Dashboard</strong> <span className="right fa fa-user-circle"></span></a>
                  <br />
                  <div id="myTab" className="tabs-vertical">
                    <ul className="tabs">
                      <li className="tab">
                        <a className="white-text" href="#user-profile"><i className="fa fa-vcard-o white-text"></i> My Profile</a>
                      </li>
                      <li className="tab">
                        <a className="white-text" href="#user-recipes"><i className="fa fa-briefcase white-text"></i> My Recipes</a>
                      </li>
                      <li className="tab">
                        <a className="white-text" href="#favorite-recipes"><i className="fa fa-heart white-text"></i> Favorite Recipes</a>
                      </li>
                      <li className="tab">
                        <a className="white-text" href=""><i className="fa fa-comments-o white-text"></i> Notifications <span id="not-badge" className="red new badge">10</span></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </ul>
    );
  }
}

export default SideNavDashboard;