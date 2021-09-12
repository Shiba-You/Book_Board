import { useState } from "react";
import Link from 'next/link';
import firebase from './api/firebase';
import auth from './api/firebase';
// import styles from "../styles/Home.module.css";

export default function Signup() {
  const [mailAddress, setMailAddress] = useState('a.y.chocola2921@gmail.com');
  const [password, setPassword] = useState('Taiyou2921');

  const createAccount = async (mailAddress, password) => {
    try {
      (await firebase
        .auth()
        .createUserWithEmailAndPassword(mailAddress, password)) &&
        firebase.firestore().collection('users').add({ mailAddress, password });
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
      <Link href={`/signup/`}>
        <button
          onClick = {() => {
            createAccount(mailAddress, password)
          }}
        >
          新規作成
        </button>
      </Link>
    </>
  );
};
