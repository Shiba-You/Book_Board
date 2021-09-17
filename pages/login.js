import { useState } from "react";;
import { useRouter } from "next/router";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { login } from '../utils/auth'

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("a.y.chocola2921@gmail.com");
  const [password, setPassword] = useState("Taiyou2921");

  const onSubmit = async (email, password) => {
    await login(email, password)
    router.push({
      pathname: "/mypage",
      query: { email },
    });
  };

  return (
    <>
      <TextField
        label="email"
        autoComplete="current-password"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={() => onSubmit(email, password)}
      >
        ログイン
      </Button>
      <Button variant="contained" color="primary">
        初めてのご利用はこちらから
      </Button>
    </>
  );
};
