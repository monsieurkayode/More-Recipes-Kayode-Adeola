import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match } from 'react-router';

import App from './App.jsx';

import './build/static/css/font-awesome.css';
import './build/static/css/materialize.css';
import './build/static/css/style.css';

import registerServiceWorker from './registerServiceWorker';

const Root = () => {
  return(
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={App} />
      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
