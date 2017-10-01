import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import App from './App.jsx';

import './build/static/css/font-awesome.css';
import './build/static/css/materialize.css';
import './build/static/css/style.css';

import registerServiceWorker from './registerServiceWorker';

const Root = () => {
  return(
    <BrowserRouter>
      <Match exactly pattern="/" coponent={App} />
    </BrowserRouter>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
