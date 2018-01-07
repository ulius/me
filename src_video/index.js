import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import './stylesheets/main.scss'
import App from './components/App'
import { reducers } from './reducers/index'



let users = [];
for (let i=1; i < 10; i++) {
  users.push({
    id: i,
    username: 'John ' + i,
    job: 'Employee ' + i
  })
}

const initial_state = {
  users: {
    list: users
  }
}

const store = createStore(reducers,  initial_state);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("app")
);
