import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux';

// Layouts
import App from './App'
import Home from './components/Home';
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <Route path="home" component={Home} />
          <Route path="*" component={Home} />
          <IndexRoute component={Home} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);