import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';

// import { timestampToTime } from '../../utils/main';
import { getArticle } from '../../utils/article';
import Layout from '../../components/template/layout';
import FloatButton from '../../components/FloatButton';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '100px'
  },
  text: {
    width: "100%",
  },
  text: {
    width: "100%",
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap"
  },
  img: {
    width: "100%",
  },
}));

export default function ArticleDetail(props) {
  const router = useRouter();
  const classes = useStyles();
  const { currentUser } = props
  const [articleTitle, setArticleTitle] = useState([]);
  const [thumbanil, setThumbanil] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    getArticle(router.query.id, setArticleTitle, setThumbanil, setContent)
  }, []);

  return (
    <>
      <Layout title={articleTitle} currentUser={currentUser}>
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h3">
              {articleTitle}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <img src={thumbanil} className={classes.img} />
          </Grid>
          <Grid item md={9}>
            <Typography className={classes.text} variant="body1">
              {content}
            </Typography>
          </Grid>
        </Grid>
        <FloatButton seed="back" position="1" />
        <FloatButton
          seed="edit"
          position="0"
          currentuser={currentUser}
          articleUid={router.query.id}
        />
        <Button
          onClick={()=>console.log(router.query.id)}
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
    const result = await fetch("../../api/loggedIn");
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
