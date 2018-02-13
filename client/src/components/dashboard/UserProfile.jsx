import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import validateProfileUpdate from '../../utils/validateProfileUpdate';
import { fetchUserDetailsAction, updateProfileAction } from '../../actions';
import holderProfile from '../../../assets/css/img/holder-profile.png';
import { WelcomeDisplay } from './';

/**
 * @summary - UserProfile class declaration
 * @class UserProfile
 * @extends {Component}
 */
class UserProfile extends Component {
  /**
   * Component constructor
   * @param {object} props
   * @memberOf UserProfile
   */
  constructor(props) {
    super(props);
    this.state = {
      bio: '',
      firstName: '',
      lastName: '',
      imageUrl: '',
      imagePreviewUrl: '',
      errors: {},
      disableForm: true
    };
  }
  /**
   * @method componentDidMount
   *
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.fetchUserDetailsAction();
  }

  /**
   * @method componentWillReceiveProps
   *
   * @param {object} nextProps
   *
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.userDetails)) {
      const {
        bio,
        lastName,
        firstName,
        imageUrl
      } = nextProps.userDetails;
      this.setState({
        bio,
        firstName,
        lastName,
        imageUrl
      });
    }
  }

  /**
   * Handle client-side input validation
   * @method isValid
   *
   * @returns {undefined}
   */
  isValid() {
    const { errors, isValid } = validateProfileUpdate(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   * Handle input change
   * @method handleInputChange
   *
   * @param {object} event
   *
   * @returns {undefined}
   */
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Handle image selection change
   * @method handleImageChange
   *
   * @param {object} event
   *
   * @returns {undefined}
   */
  handleImageChange = (event) => {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imageUrl: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  /**
   * Reset form to initial state
   * @method resetForm
   *
   * @param {object} event
   *
   * @returns {undefined}
   */
  resetForm = (event) => {
    event.preventDefault();
    const { bio, firstName, lastName, imageUrl } = this.props.userDetails;
    this.setState({
      disableForm: true,
      bio,
      firstName,
      lastName,
      imageUrl,
      imagePreviewUrl: '',
      errors: {}
    });
  }

  /**
   * Disable or enable form inputs
   * @method toggleForm
   *
   * @param {object} event
   *
   * @returns {undefined}
   */
  toggleForm = (event) => {
    event.preventDefault();
    this.setState({
      disableForm: !this.state.disableForm
    });
  }

  /**
   * Hanlde Submit
   * @method handleSubmit
   *
   * @param {object} event
   *
   * @returns {undefined}
   */
  handleSubmit = (event) => {
    event.preventDefault();
    const userDetails = { ...this.state };
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.updateProfileAction(userDetails)
        .then(() => this.setState({ disableForm: true }));
    }
  }

  /**
   * Renders the component
   * @method render
   *
   * @returns {JSX} JSX
   */
  render() {
    const { imagePreviewUrl } = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} alt="" />);
    } else {
      imagePreview = (<img
        className="responsive-img"
        src={this.props.userDetails.imageUrl || holderProfile}
        alt=""
      />);
    }
    const { username } = this.props.user;
    const { firstName, lastName } = this.state.errors;
    return (
      <div id="user-profile" className="col l9 m12 s12 offset-l3">
        <WelcomeDisplay selected={this.props.selected} />
        <div id="my-profile" className="row">
          <div className="col l12 m12 s12">
            <div className="row">
              <div className="col l4 m4">
                <div className="card z-depth-2">
                  <div className="card-image">
                    {imagePreview}
                  </div>
                </div>
              </div>
              <div className="col l8 m8 s12">
                <form id="profile-form" onSubmit={this.handleSubmit}>
                  <div className="browser-default">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      onChange={this.handleInputChange}
                      value={this.state.firstName}
                      disabled={this.state.disableForm}
                    />
                    {firstName && <span className="red-text">{firstName}</span>}
                  </div>
                  <div className="browser-default">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      onChange={this.handleInputChange}
                      value={this.state.lastName}
                      disabled={this.state.disableForm}
                    />
                    {lastName && <span className="red-text">{lastName}</span>}
                  </div>
                  <div className="browser-default">
                    <label htmlFor="handle">Public Display Name</label>
                    <input
                      type="text"
                      defaultValue={`@${username}`}
                      disabled
                    />
                  </div>
                  <div className="browser-default">
                    <label htmlFor="about-me">About Me</label>
                    <textarea
                      name="bio"
                      value={this.state.bio}
                      onChange={this.handleInputChange}
                      disabled={this.state.disableForm}
                    />
                  </div>
                  {!this.state.disableForm &&
                  <div id="profile-image-btn">
                    <label htmlFor="imageUrl">
                      <input
                        onChange={this.handleImageChange}
                        type="file"
                        id="imageUrl"
                        name="imageUrl"
                      />
                      <span
                        className="btn"
                      >
                      Upload Image
                      </span>
                    </label>
                  </div>}
                  {this.state.disableForm ?
                    <button
                      onClick={this.toggleForm}
                      className="btn right grey darken-1 profile-edit-btn"
                    >
                      <i className="fa fa-pencil" /> Edit Profile
                    </button> :
                    <div className="profile-btn-group">
                      <button
                        onClick={this.resetForm}
                        className="btn grey darken-1 right"
                      >
                        <i className="fa fa-times" /> Discard
                      </button>
                      <button
                        type="submit"
                        onClick={this.handleSubmit}
                        className="btn right grey darken-1"
                      >
                        <i className="fa fa-save" /> Save Profile
                      </button>
                    </div>
                  }
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserProfile.defaultProps = {
  userDetails: {}
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired,
  selected: PropTypes.string.isRequired,
  fetchUserDetailsAction: PropTypes.func.isRequired,
  updateProfileAction: PropTypes.func.isRequired,
  userDetails: PropTypes.shape({
    bio: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    imageUrl: PropTypes.string,
  })
};

const mapStateToProps = ({ userDetails }) => ({ userDetails });

export default connect(mapStateToProps, {
  fetchUserDetailsAction,
  updateProfileAction
})(UserProfile);

