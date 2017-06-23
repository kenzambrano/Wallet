import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import routes from './routes/routes';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers'
import {SetCurrentUser} from './actions/AuthActions'
import {auth, db} from './api/firebase'
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

auth.onAuthStateChanged((snap) => {
  if (snap) {
    db.ref(`users/${snap.uid}`).once('value', user => {
      let current = user.val()
      current.uid = user.key
      store.dispatch(SetCurrentUser(current));
      render()
    })
  } else {
    store.dispatch(SetCurrentUser({}));
    localStorage.removeItem('user')
    render()
  }
})


function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>, document.getElementById('root'));
  registerServiceWorker();
}
