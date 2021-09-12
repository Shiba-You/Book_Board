import { useState } from "react";
import firebase from './api/firebase';
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();
  const [mailAddress, setMailAddress] = useState('a.y.chocola2921@gmail.com');
  const [password, setPassword] = useState('Taiyou2921');

  const createAccount = async (mailAddress, password) => {
    try {
      (await firebase
          .auth()
          .createUserWithEmailAndPassword(mailAddress, password)) &&
        firebase.firestore().collection('users').add({ mailAddress, password })
        await firebase
          .auth()
          .signInWithEmailAndPassword(mailAddress, password)
        router.push({
          pathname: "/mypage",
          query: { mailAddress },
        });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div>
        <label>mailAddress</label>
        <input
          value={mailAddress}
          onChange={(e) => setMailAddress(e.target.value)}
        />
      </div>
      <div>
        <label>
          password
        </label>
        <input 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        onClick = {() => {
          createAccount(mailAddress, password)
        }}
      >
        新規作成
      </button>
    </>
  );
};
