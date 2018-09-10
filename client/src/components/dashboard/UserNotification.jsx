import React, { Component } from 'react';
import PropTypes from 'proptypes';
import khaleesi from '../../../assets/css/img/khaleesi.jpeg';

/**
 * @summary - UserNotification class declaration
 * @class UserNotification
 * @extends {Component}
 */
class UserNotification extends Component {
  /**
   * @method componentDidMount
   * @memberof UserNotification
   *
   * @returns {void}
   */
  componentDidMount() {
    const { isFetching } = this.props;
    isFetching(false, 'DashboardPage');
  }

  /**
   * Renders the component
   * @method render
   *
   * @returns {JSX} JSX
   */
  render() {
    return (
      <div
        style={{ marginTop: '10%', fontFamily: 'Roboto, sans-serif' }}
        className="col l9 m12 s12 offset-l3 center-align"
      >
        <img style={{ borderRadius: '50%' }} src={khaleesi} alt="" />
        <div>Khaleesi will notify you once the night king arrives :-)</div>
      </div>
    );
  }
}

UserNotification.propTypes = {
  isFetching: PropTypes.func.isRequired,
};

export default UserNotification;
