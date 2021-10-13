import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

import Layout from '../components/template/layout';
import FloatButton from '../components/FloatButton';
import Article from "../components/article";
import { getAllArticles, getAllArticlesUid } from "../utils/article";


export default function Test(props) {
  const { currentUser, pid } = props;
  const title = "Test";

  const check = () => {
    console.log(pid)
    console.log(props)
  }

  return(
  <>
    <Layout title={title} currentUser={currentUser}>
      <p>テスト</p>
      <Button
       onClick={() => check()}
      >
        Check
      </Button>
    </Layout>
  </>
  );
}


Test.getInitialProps = async ({ req, res }) => {
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
