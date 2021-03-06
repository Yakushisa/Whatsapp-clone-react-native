import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import base64 from 'base-64';

import * as type from '../resources/types';

/*
ActionCreator to manipulate InputText on (SignUpScreen)
*/
export const addName = (name) => {
  return {
    type: type.ADD_NAME,
    payload: name
  }
}
export const addEmail = (email) => {
  return {
    type: type.ADD_EMAIL,
    payload: email
  }
}
export const addPassword = (password) => {
  return {
    type: type.ADD_PASSWORD,
    payload: password
  }
}


/*
ActionCreator to signIn on application
*/
export const SignIN = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: type.SIGN_IN_LOADING })

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      const TOKEN_KEY = response.refreshToken;
      AsyncStorage.setItem('@mytoken:key', TOKEN_KEY);
      authSuccess(dispatch)
    })
    .catch(error => authUnsuccess(error, dispatch))
  }
}

const authSuccess = (dispatch) => {
  dispatch({ type: type.AUTH_SUCCESS });
  Actions.mainScreen();
}
const authUnsuccess = (error, dispatch) => {
  dispatch({ type: type.AUTH_FAILURE, payload: error.code })
}

/*
ActionCreator to create new user registration
*/
export const registerUser = ({ name, email, password }) => {
  return dispatch => {
    dispatch({ type: type.SIGN_UP_LOADING })

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(response => {
      let EmailEncode = base64.encode(email);
      firebase.database().ref(`/users/${EmailEncode}`)
      .push({ name })
      .then(response => registerSuccess(dispatch))
    })
    .catch(error => registerUnsuccess(error, dispatch))
  }
}

const registerSuccess = (dispatch) => {
  dispatch({ type: type.SUCCESS_REGISTER });
  Actions.welcomeScreen();
}

const registerUnsuccess = (error, dispatch) => {
  dispatch({ type: type.FAILURE_REGISTER, payload: error.code })
}
