import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { parseCookies } from "nookies";

import { auth } from '../pages/api/firebase';
import Layout from '../components/template/layout';

export default function Mypage(props) {
  // const router = useRouter();

  const user = auth.onAuthStateChanged((usr) => {
    if(usr) {
      console.log(auth.currentUser.uid)
      return auth.currentUser
    } else {
      console.log("nothing")
      return ""
    }
  });

  const { email } = props
  const title = "Mypage";
  console.log(user)

  return(
  <>
    <Layout title={title} email={email}>
      <p>Mypage</p>
      <button
        onClick={()=>console.log(user)}
      >
      </button>
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
      email: (json.user || {}).email || ""
    };

  }

  if (!isServerSide) {
    const result = await fetch("./api/loggedIn");
    const json = (await result.json())
   
    if (!json.user) Router.push({pathname: "/login"});

    return { 
      email: (json.user || {}).email || ""
    };
  }

  return { 
    email: ""
  };

};
