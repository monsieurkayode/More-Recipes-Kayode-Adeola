import React from 'react';
import bannerImage from '../../assets/css/img/banner2.jpg';

const Banner = (props => {
  return(
    <div id="banner" className="hide-on-small-only">
      <div className="card z-depth-0">
        <div className="card-image">
          <img className="responsive-img" src={bannerImage} alt="" />
          <span className="card-title"></span>
        </div>
      </div>
    </div>
  )
});

export default Banner;