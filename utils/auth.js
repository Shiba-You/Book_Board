import { auth, db } from '../pages/api/firebase';

export const login = async (email, password) => {
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

export const logout = async () => {
  await fetch('api/sessionLogout', {
    method: 'POST'
  });
};

export const signup = async (name, email, password) => {
  try {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = auth.currentUser;
        return user.updateProfile({
          displayName: name,
          photoURL: ''
        })
      })
    await login(email, password)
  } catch (error) {
    alert(error);
  }
};
