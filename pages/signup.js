import { useState } from "react";;
import { useRouter } from "next/router";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography } from "@material-ui/core"

import { signup } from '../utils/auth';
import Layout from '../components/template/layout'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '100px'
  },
  title: {
    margin: 'auto',
  },
  text: {
    margin: 'auto',
    width: '90%',
  },
  btn: {
    margin: 'auto',
    width: '80%',
  }
}));

export default function Signup() {
  const router = useRouter();
  const classes = useStyles();
  const [email, setEmail] = useState("a.y.chocola2921@gmail.com");
  const [password, setPassword] = useState("Taiyou2921");
  const title = "Sign Up"

  const createAccount = async (email, password) => {
    await signup(email, password)
    router.push({
      pathname: "/mypage",
      query: { email },
    });
  };

  return (
    <>
      <Layout title={title}>
        <Grid container spacing={3} className={classes.root}>
          <Grid container item xs={12}>
            <Typography variant="h3" className={classes.title}>
              新規作成
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            <TextField
              className={classes.text}
              label="email"
              autoComplete="current-password"
              variant="outlined"
              margin="dense"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid container item xs={12}>
            <TextField
              className={classes.text}
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              margin="dense"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid container item sm={6} xs={12}>
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              onClick={() => router.push({pathname: "/login"})}
            >
              ログイン画面に戻る
            </Button>
          </Grid>
          <Grid container item sm={6} xs={12}>
            <Button
              className={classes.btn}
              variant="contained"
              onClick = {() => {createAccount(email, password)}}
            >
              新規作成
            </Button>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};
