import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';

// import { timestampToTime } from '../../utils/main';
import { getArticle } from '../../../utils/article';
import Layout from '../../../components/template/layout';
import FloatButton from '../../../components/FloatButton';
import UpLoad from '../../../components/Upload';
import { toBase64Url } from '../../../utils/main';

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
  const { currentUser } = props;
  const [articleTitle, setArticleTitle] = useState([]);
  const [thumbanil, setThumbanil] = useState([]);
  const [content, setContent] = useState([]);
  const title = "Edit Article";
  useEffect(() => {
    getArticle(router.query.id, setArticleTitle, setThumbanil, setContent)
  }, []);
  const toBase64 = () => {
    console.log(thumbanil)
  }


  return (
    <Layout title={title} currentUser={currentUser}>
      <Grid container spacing={3} className={classes.root}>
        <Grid container item xs={12}>
          <TextField
            className={classes.text}
            label="タイトル"
            id="standard-basic"
            margin="dense"
            value={articleTitle}
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
        articleUid={router.query.id}
        currentuser={currentUser}
        artileTitle={articleTitle}
        content={content}
        image={thumbanil}
      />
      <Button
        onClick={()=>toBase64()}
      >
        thumbnail
      </Button>
      <Button
        onClick={()=>console.log(thumbanil)}
      >
        thumbnail
      </Button>
    </Layout>
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
    const result = await fetch("../api/loggedIn");
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
