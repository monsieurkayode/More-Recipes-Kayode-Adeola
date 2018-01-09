import React from 'react';
import PreloaderIcon, { ICON_TYPE } from 'react-preloader-icon';

const Loader = () => (
  <div style={{ margin: '25% 45%' }}>
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
