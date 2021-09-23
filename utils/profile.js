import { auth } from '../pages/api/firebase';

export const changeNameAndPhotoURL = async (name) => {
  const user = auth.currentUser;
  try {
    await user.updateProfile({
      displayName: name
      // photoURL: 
    })
  } catch (error) {
    alert(error);
  }
};

export const changeEmail = async (email) => {
  const user = auth.currentUser;
  try {
    await user.updateEmail({email})
  } catch (error) {
    alert(error);
  }
};

export const changePassword = async (password) => {
  const user = auth.currentUser;
  try {
    await user.updatePassword({password})
  } catch (error) {
    alert(error);
  }
};

export const reLogin = async (email, password) => {
  await fetch('api/sessionLogout', {
    method: 'POST'
  });
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    const id = await result.user.getIdToken();
    await fetch('api/session', {
      method: 'POST', body: JSON.stringify({ id })
    });
  } catch (error) {
    alert(error);
  }
};
