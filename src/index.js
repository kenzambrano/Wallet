import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Routes from './routes/routes';
import { Router, browserHistory } from 'react-router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((<Router history={browserHistory} routes={Routes} />), document.getElementById('root'));
registerServiceWorker();
