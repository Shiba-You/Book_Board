import Router, { useRouter } from "next/router";
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Typography } from "@material-ui/core"
import Button from '@material-ui/core/Button';

import Layout from '../components/template/layout';

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
  },
  explain: {
    marginTop: '2%',
    marginLeft: '5%'
  }
}));

export default function Profile(props) {
  const { currentUser } = props;
  const classes = useStyles();
  const router = useRouter();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [photo, setPhoto] = useState(currentUser.photo);
  const [password, setPassword] = useState();
  const [passwordValid, setPasswordValid] = useState();
  const title = "Profile";

  return(
  <>
    <Layout title={title} currentUser={currentUser}>
      <Grid container spacing={3} className={classes.root}>
        <Grid container item xs={12}>
          <Typography variant="h3" className={classes.title}>
            Edit Profile
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <TextField
            className={classes.text}
            label="name"
            autoComplete="current-password"
            variant="outlined"
            margin="dense"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <Typography variant="h6" className={classes.text, classes.explain}>
            If you forgot or want to change your password...
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <TextField
            className={classes.text}
            label="password"
            autoComplete="current-password"
            variant="outlined"
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid container item xs={12}>
          <TextField
            className={classes.text}
            label="password(again)"
            autoComplete="current-password"
            variant="outlined"
            margin="dense"
            value={passwordValid}
            onChange={(e) => setPasswordValid(e.target.value)}
          />
        </Grid>
        <Grid container item sm={6} xs={12}>
          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick = {() => {router.back()}}
          >
            戻る
          </Button>
        </Grid>
        <Grid container item sm={6} xs={12}>
          <Button
            className={classes.btn}
            variant="contained"
            onClick = {() => {updateProfile(name, email, password)}}
          >
            更新
          </Button>
        </Grid>
      </Grid>
    </Layout>
  </>
  );
}


Profile.getInitialProps = async ({ req, res }) => {
  const isServerSide = typeof window === "undefined";
  if (isServerSide && req && res) {
    const root = "http://localhost:3000";
    const options = { headers: { cookie: req.headers.cookie || "" } };
    const result = await fetch(`${root}/api/loggedIn`, options);
    const json = (await result.json())
    if (!json.user) {
      res.writeHead(302, { Location: "/login" });
      res.end();
    }
    return { 
      currentUser: (json.user || {}).currentUser || ""
    };
  }
  if (!isServerSide) {
    const result = await fetch("./api/loggedIn");
    const json = (await result.json())
    if (!json.user) Router.push({pathname: "/login"});
    return { 
      currentUser: (json.user || {}).currentUser || ""
    };
  }
  return { 
    currentUser: ""
  };
};