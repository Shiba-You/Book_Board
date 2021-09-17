// import nookies from "nookies";

import firebase from '../pages/api/firebase';

export const login = async (email, password) => {
  try {
    const result = await firebase
                          .auth()
                          .signInWithEmailAndPassword(email, password);
    const id = await result.user.getIdToken();
    await fetch('api/session', {
      method: 'POST', body: JSON.stringify({ id })
    });
  } catch (error) {
    alert(error);
  }
};

export const logout = async () => {
  await fetch('api/sessionLogout', {
    method: 'POST'
  });
};

export const signup = async (email, password) => {
  try {
    (await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)) &&
      firebase.firestore().collection('users').add({ email, password })
      await login(email, password)
  } catch (error) {
    alert(error);
  }
};
