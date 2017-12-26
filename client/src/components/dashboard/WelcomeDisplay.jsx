import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';

class WelcomeDisplay extends Component {
  render() {
    const { username } = this.props.user;
    const { selected } = this.props;
    return (
      <div id="welcome-panel" className="card-panel grey lighten-4">
        <span className="card-content">
          <h5>Welcome {username}!</h5>
          <span>Dashboard / My {selected}</span>
        </span>
      </div>
    );
  }
}

WelcomeDisplay.defaultProps = {
  user: {}
};

WelcomeDisplay.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string
  }),
  selected: PropTypes.string.isRequired
};

const mapStateToProps = ({ signinState, routing }) => ({
  user: signinState.user,
  selected: routing.selected
});


export default connect(mapStateToProps)(WelcomeDisplay);
