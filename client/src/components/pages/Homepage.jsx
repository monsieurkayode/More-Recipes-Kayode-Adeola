import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Homepage
 *
 * @function Homepage
 *
 * @returns {JSX} JSX
 */
const Homepage = () => (
  <div className="home">
    <div className="bg-home">
      <div className="bg-overlay">
        <img className="responsive-img" src="favicon.ico" alt="" />
        <h3>Welcome to awesome tastefullness!</h3>
        <h5>Creating and sharing recipes has never been much fun</h5>
        <Link to="/signup" >
          <button id="signup" className="btn btn-home">Sign up</button>
        </Link>
        <Link to="/signin" >
          <button id="signin" className="btn btn-home">Sign In</button>
        </Link>
      </div>
    </div>
  </div>
);

export default Homepage;
