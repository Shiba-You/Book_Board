import Router from "next/router";
import { useState } from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Layout from '../components/template/layout';
import UpLoad from '../components/Upload';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '100px'
  },
  text: {
    width: "100%",
  }
}));

export default function New(props) {
  const { currentUser } = props
  const classes = useStyles();
  const title = "Add new book";
  const [artileTitle, setArticleTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  return(
  <>
    <Layout title={title} currentUser={currentUser}>
      <Grid container spacing={3} className={classes.root}>
        <Grid container item xs={12}>
          <TextField
            className={classes.text}
            label="タイトル"
            autoComplete="current-password"
            variant="outlined"
            margin="dense"
            value={artileTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
          />
        </Grid>
        <Grid item md={3}>
          <UpLoad currentUser={currentUser} image={image} setImage={setImage} />
        </Grid>
        <Grid item md={9}>
          <TextField
            className={classes.text}
            placeholder="本文をここに記入してください"
            multiline
            minRows={50}
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Grid>
      </Grid>
    </Layout>
  </>
  );
}


New.getInitialProps = async ({ req, res }) => {
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
