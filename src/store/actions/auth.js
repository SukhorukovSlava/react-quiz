import appConfig from "../../appConfig";
import axios from 'axios';
import {ActionType} from "./ActionType";
import {
  removeItemsToLS,
  setItemsToLS,
  getItemFromLS
} from "../../utils/utilsForWorkLocalstorage";

export const signIn = (email, password) => async dispatch => {
  const signInData = {
    email,
    password,
    returnSecureToken: true
  };

  try {
    const response = await axios.post(
      appConfig.firebaseSignInURL + appConfig.API_KEY,
      signInData
    );

    const data = response.data;
    const token = data.idToken;
    const userId = data.localId;
    const expiresIn = data.expiresIn * 1000;
    const timeStampNow = new Date().getTime();

    setItemsToLS({
      token,
      userId,
      expirationDate: timeStampNow + expiresIn
    });

    dispatch(successfulAuth(token));

    dispatch(autoLogoutAfterTime(expiresIn));


  } catch (e) {
    console.error(e);
  }
};

export const signUp = (email, password) => async dispatch => {
  const signUpData = {
    email,
    password,
    returnSecureToken: true
  };

  try {
    const response = await axios.post(
      appConfig.firebaseSignUpURL + appConfig.API_KEY,
      signUpData
    );

    const data = response.data;
    const token = data.idToken;
    const userId = data.localId;
    const expiresIn = data.expiresIn * 1000;
    const timeStampNow = new Date().getTime();

    setItemsToLS({
      token,
      userId,
      expirationDate: timeStampNow + expiresIn
    });

    dispatch(successfulAuth(token));

    dispatch(autoLogoutAfterTime(expiresIn));

  } catch (e) {
    console.error(e);
  }
};

const successfulAuth = token => {
  return {
    type: ActionType.typeList.SUCCESSFUL_AUTH,
    payload: token
  }
};

const autoLogoutAfterTime = time => dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, time);
};

export const logout = () => {
  removeItemsToLS(['token', 'userId', 'expirationDate']);

  return {
    type: ActionType.typeList.AUTH_LOGOUT
  }
};

export const autoLogin = () => async dispatch => {
  const token = getItemFromLS('token');

  if (!token) {
    dispatch(logout());
    return;
  }

  const expirationDateToken = getItemFromLS('expirationDate');
  const curTimestamp = new Date().getTime();

  if (expirationDateToken <= curTimestamp) {
    dispatch(logout());
  } else {
    dispatch(successfulAuth(token));

    const timeLeftToken = expirationDateToken - curTimestamp; // ms

    dispatch(autoLogoutAfterTime(timeLeftToken));
  }
};