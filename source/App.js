import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import Routes from './Routes';
import reducers from './reducers/index';

import { config } from './resources/MyFirebaseSettings';

export default class App extends Component<{}> {
  componentWillMount() {
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes />
      </Provider>
    );
  }
}



/*
<Provider store={createStore(combineReducers({
   AuthReducer: _AuthReducer,
   reducer2: () => []
})
)}>

-- AuthReducer.js

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_EMAIL':
*/
