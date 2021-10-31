import Router, { useRouter } from "next/router";
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Typography } from "@material-ui/core"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import Layout from '../components/template/layout';
import { changeNameAndPhotoURL, changeEmail, changePassword, reLogin } from '../utils/profile'
import UpLoad from '../components/Upload';

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
    marginLeft: '5%'
  },
  bar: {
    marginTop: '10%'
  },
  dialogBtn: {
    textAlign: 'left',
  }
}));

export default function Profile(props) {
  const { currentUser } = props;
  const classes = useStyles();
  const router = useRouter();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [thumbanil, setThumbanil] = useState(currentUser?.picture);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordValid, setNewPasswordValid] = useState('');
  const [open, setOpen] = useState(false);
  const title = "Profile";
  console.log(currentUser)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateProfile = async (name, email, password, thumbanil) => {
    let flag = false
    if ((name != currentUser.name  && name) || (thumbanil != currentUser.photoURL)) {
      await changeNameAndPhotoURL(name, thumbanil)
      flag = true
    }
    if (email != currentUser.email && email) {
      await changeEmail(email)
      flag = true
    }
    if (flag) {
      await reLogin(email, password)
      router.reload()
    } else {
      alert('エラーが発生しました')
    }
  };

  const updatePass = async (email, newPassword, newPasswordValid) => {
    if (newPassword == newPasswordValid) {
      await changePassword(email, newPassword)
    } else {
      return
    }
  }

  return(
  <>
    <Layout title={title} currentUser={currentUser}>
      <Grid container spacing={3} className={classes.root}>
        <Grid container item xs={12}>
          <Typography variant="h3" className={classes.title}>
            Edit Profile
          </Typography>
        </Grid>
        <Grid item md={3}>
          <UpLoad currentUser={currentUser} image={thumbanil} setImage={setThumbanil} square={true} />
        </Grid>
        <Grid container item xs={9}>
        <Grid container item >
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
          <Grid container item >
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
          <Grid container item sm={6} xs={12}>
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              onClick = {() => {router.push({pathname: '/mypage', query: {page: 1}})}}
            >
              戻る
            </Button>
          </Grid>
          <Grid container item sm={6} xs={12}>
            <Button
              className={classes.btn}
              variant="contained"
              onClick = {handleClickOpen}
            >
              更新
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <hr className={classes.bar} />
      <Grid container justifyContent="flex-end" spacing={3}>
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
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Grid>
        <Grid container item xs={12}>
          <TextField
            className={classes.text}
            label="password(again)"
            autoComplete="current-password"
            variant="outlined"
            margin="dense"
            value={newPasswordValid}
            onChange={(e) => setNewPasswordValid(e.target.value)}
          />
        </Grid>
        <Grid
          container
          item
          sm={6}
          xs={12}
        >
          <Button
            className={classes.btn}
            variant="contained"
            onClick = {() => updatePass(email, newPassword, newPasswordValid)}
          >
            パスワード変更
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth='md'
      >
        <DialogContent>
          <DialogContentText>
            パスワードを入力してください．
          </DialogContentText>
          <TextField
            className={classes.text}
            label="password"
            autoComplete="current-password"
            variant="outlined"
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
          >
            戻る
          </Button>
          <Button
            onClick={() => updateProfile(name, email, password, thumbanil)}
            color="primary"
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>
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
    if (!json.user) Router.push("/login");
    return { 
      currentUser: (json.user || {}).currentUser || ""
    };
  }
  return { 
    currentUser: ""
  };
};