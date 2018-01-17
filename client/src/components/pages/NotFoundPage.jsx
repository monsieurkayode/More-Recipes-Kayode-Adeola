import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'proptypes';
import resetPage from '../../utils/resetPage';

class NotFoundPage extends Component {
  redirectBack = () => {
    this.props.history.goBack();
  }
  render() {
    return (
      <div className="center-align" style={{ marginTop: '10%' }}>
        <h2 className="red-text">
          404
        </h2>
        <img
          style={{ height: '200px' }}
          src="/css/img/sad_smiley.png"
          alt=""
        />
        <h3>
          We are sorry but there is nothing here
        </h3>
        <Link to="/" onClick={resetPage}>
          <h6> <span><i className="fa fa-home" /></span> Back to home</h6>
        </Link>
        <div
          className="blue-text"
          style={{ cursor: 'pointer' }}
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
