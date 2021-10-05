import Router from "next/router";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

import { db } from './api/firebase';
import Layout from '../components/template/layout';
import FloatButton from '../components/FloatButton';
import Article from "../components/article";


export default function Mypage(props) {

  const { currentUser } = props
  const docRef = db
    .collection('version/1/articles')
  const [articles, setArticles] = useState([]);
  const title = "Mypage";
  useEffect(() => {
    docRef
      .where('user_uid', '==', currentUser.uid)
      .get()
      .then(snapshot => {
        let docs = [];
        snapshot.forEach(doc => {
          docs.push(Object.assign(doc.data(), {uid: doc.id}))
        });
        setArticles(docs);
      })
  }, []);

  return(
  <>
    <Layout title={title} currentUser={currentUser}>
      <Grid container spacing={3}>
        <Button
          onClick={() => console.log(articles)}
        />
        {(
          articles.map((article, i) => {
            return (
              <Grid item xs={12} md={6}>
                <Article
                  key={i}
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
      <FloatButton seed="add" twin="0" />
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
