import Router from "next/router";
import { useState } from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Layout from '../components/template/layout';
import UpLoad from '../components/Upload';
import FloatButton from '../components/FloatButton';

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
  const title = "Add new Article";
  const [artileTitle, setArticleTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbanil, setThumbanil] = useState("");

  return(
  <>
    <Layout title={title} currentUser={currentUser}>
      <Grid container spacing={3} className={classes.root}>
        <Grid container item xs={12}>
          <TextField
            className={classes.text}
            label="タイトル"
            id="standard-basic"
            margin="dense"
            value={artileTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
          />
        </Grid>
        <Grid item md={3}>
          <UpLoad currentUser={currentUser} image={thumbanil} setImage={setThumbanil} />
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
      <FloatButton
        seed="cancel"
        position="1"
      />
      <FloatButton
        seed="save"
        position="0"
        artileTitle={artileTitle}
        content={content}
        currentuser={currentUser}
        image={thumbanil}
      />
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
    if (!json.user) Router.push("/login");
    return { 
      currentUser: (json.user || {}).currentUser || ""
    };
  }
  return { 
    currentUser: ""
  };
};
