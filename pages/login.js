import { useState } from "react";
import { useRouter } from "next/router";
import firebase from './api/firebase';

export default function Login() {
  const router = useRouter();
  const [mailAddress, setMailAddress] = useState("a.y.chocola2921@gmail.com");
  const [password, setPassword] = useState("Taiyou2921");

  const login = async (mailAddress, password) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(mailAddress, password);
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
        onClick={() => router.push({ pathname: "/signup"})}
      >
        初めてのご利用はこちらから
      </button>
      <button
        onClick={() => login(mailAddress, password)}
      >
        ログイン
      </button>
    </>
  );
};
