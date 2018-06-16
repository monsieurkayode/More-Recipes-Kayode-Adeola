import React from 'react';
import bannerImage from '../../../assets/css/img/banner2.jpg';

/**
 * Banner
 * @function Banner
 *
 * @param {void} void
 *
 * @return {JSX} JSX
 */
const Banner = () => (
  <div id="banner" className="hide-on-small-only">
    <div className="card z-depth-0">
      <div className="card-image">
        <img className="responsive-img" src={bannerImage} alt="" />
      </div>
    </div>
  </div>
);

export default Banner;
