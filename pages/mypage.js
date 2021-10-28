import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

import Layout from '../components/template/layout';
import FloatButton from '../components/FloatButton';
import BottomPageNation from '../components/BottomPageNation';
import Article from "../components/article";

export default function Mypage(props) {
  const { currentUser } = props;
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const title = "Mypage";
  return(
  <>
    <Layout title={title} currentUser={currentUser}>
      <Grid container spacing={3}>
        {(
          articles.map((article, i) => {
            return (
              <Grid key={i} item xs={12} md={6}>
                <Article
                  title={article.title}
                  content={article.content}
                  createAt={article.createAt}
                  thumbanil={article.thumbanil}
                  uid={article.uid}
                />
              </Grid>
            )
          })
        )}
      </Grid>
      <Grid container spacing={3}>
        <BottomPageNation currentUser={currentUser} setArticles={setArticles}/>
      </Grid>
      <FloatButton seed="add" position="0" />
    </Layout>
  </>
  );
}


Mypage.getInitialProps = async ({ req, res }) => {
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
