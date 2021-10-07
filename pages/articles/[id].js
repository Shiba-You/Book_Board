import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

// import { timestampToTime } from '../../utils/main';
import { getArticle } from '../../utils/articles';
import Layout from '../../components/template/layout';
import FloatButton from '../../components/FloatButton';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '100px'
  },
  text: {
    width: "100%",
  }
}));

export default function ArticleDetail(props) {
  const router = useRouter();
  const classes = useStyles();
  const { currentUser } = props
  const [article, setArticle] = useState([]);

  useEffect(() => {
    getArticle(router.query.id, setArticle)
  }, []);
  return (
    <>
      <Layout title={article.title} currentUser={currentUser}>
        <Grid container spacing={3} className={classes.root}>
          <Grid container item xs={12}>
            <TextField
              className={classes.text}
              margin="dense"
              disabled
              value={article.title}
            />
          </Grid>
          <Grid item md={9}>
            <TextField
              className={classes.text}
              multiline
              minRows={50}
              variant="outlined"
              disabled
              value={article.content}
            />
          </Grid>
        </Grid>
        <FloatButton
          seed="write"
          twin="0"
        />
      </Layout>
    </>
  )
};


ArticleDetail.getInitialProps = async ({ req, res }) => {
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
