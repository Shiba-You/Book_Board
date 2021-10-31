import { auth } from '../pages/api/firebase';
import { saveImage } from './article';
import { makeRnd } from './main';

export const changeNameAndPhotoURL = async (name, thumbanil) => {
  const user = auth.currentUser;
  const imageTag = makeRnd(16)
  try {
    await saveImage(user, thumbanil, imageTag).then(storageUrl => {
      user.updateProfile({
        displayName: name,
        photoURL: storageUrl
      })
    })
  } catch (error) {
    alert(error);
  }
};

export const changeEmail = async (email) => {
  const user = auth.currentUser;
  try {
    await user.updateEmail(email)
  } catch (error) {
    alert(error);
  }
};

export const changePassword = async (email, newPass) => {
  try {
    await auth
    .currentUser
    .updatePassword(newPass)
    .then(() => {
      alert("success")
    })
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
