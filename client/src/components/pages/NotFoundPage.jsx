import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'proptypes';
import resetPage from '../../utils/resetPage';
import sad from '../../../assets/css/img/sad.png';

/**
 * @summary - NotFoundPage class declaration
 * @class NotFoundPage
 * @extends {Component}
 */
class NotFoundPage extends Component {
  /**
   * Handle input change
   * @method redirectBack
   *
   * @param {void} void
   *
   * @returns {void}
   */
  redirectBack = () => {
    this.props.history.goBack();
  }

  /**
   * Renders the component
   * @method render
   *
   * @returns {JSX} JSX
   */
  render() {
    return (
      <div id="not-found-container" className="center-align">
        <h2 className="red-text">
          404
        </h2>
        <img
          src={sad}
          alt=""
        />
        <h3>
          We are sorry but there is nothing here
        </h3>
        <Link to="/" onClick={resetPage}>
          <h6> <span><i className="fa fa-home" /></span> Back to home</h6>
        </Link>
        <div
          id="back-link"
          className="blue-text"
          onClick={this.redirectBack}
        >
          <span><i className="fa fa-chevron-left" /></span> Back
        </div>
      </div>
    );
  }
}

NotFoundPage.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
};

export default NotFoundPage;
