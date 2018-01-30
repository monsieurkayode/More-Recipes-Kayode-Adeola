import React from 'react';
import PreloaderIcon, { ICON_TYPE } from 'react-preloader-icon';

/**
 * Loader
 * @function Loader
 *
 * @param {void} void
 *
 * @return {JSX} JSX
 */
const Loader = () => (
  <div className="loader">
    <PreloaderIcon
      type={ICON_TYPE.OVAL}
      size={80}
      strokeWidth={7}
      strokeColor="#006664"
      duration={800}
    />
  </div>
);

export default Loader;
