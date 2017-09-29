import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './build/static/css/font-awesome.css';
import './build/static/css/materialize.css';
import './build/static/css/style.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
