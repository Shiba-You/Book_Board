import Router, { useRouter } from "next/router";
import { parseCookies } from "nookies";

import firebase from '../pages/api/firebase';
import Layout from '../components/template/layout';

export default function Mypage(props) {
  // const router = useRouter();

  const { email, result } = props
  const user = firebase.auth().currentUser
  console.log(user)
  console.log(user.email)
  console.log(user.uid)
  console.log(user.password)
  // const user = firebase
  //               .auth()
  //               .signInWithCustomToken(token);
  // console.log(user)

  const title = "Mypage";

  return(
  <>
    <Layout title={title} email={email}>
      <p>Mypage</p>
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
      email: (json.user || {}).email || "",
      token: json
    };
  }

  if (!isServerSide) {
    const result = await fetch("./api/loggedIn");
    const json = (await result.json())
   
    if (!json.user) Router.push({pathname: "/login"});

    return { 
      email: (json.user || {}).email || "",
      token: json
    };
  }

  return { 
    email: "",
    token: json
  };

};
