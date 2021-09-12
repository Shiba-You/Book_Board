import { useState } from "react";
import Link from 'next/link'
// import styles from "../styles/Home.module.css";

export default function Login() {
  const [mailAddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");

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
        <button>
          初めてのご利用はこちらから
        </button>
      </Link>
      <Link href={`/`}>
        <button>
          ログイン
        </button>
      </Link>
    </>
  );
};
