import { useState } from "react";
import { useRouter } from "next/router";

import { signup } from '../utils/auth';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('a.y.chocola2921@gmail.com');
  const [password, setPassword] = useState('Taiyou2921');

  const createAccount = async (email, password) => {
    await signup(email, password)
    router.push({
      pathname: "/mypage",
      query: { email },
    });
  };

  

  return (
    <>
      <div>
        <label>email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          createAccount(email, password)
        }}
      >
        新規作成
      </button>
    </>
  );
};
