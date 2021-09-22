import Router, { useRouter } from "next/router";

import Layout from '../components/template/layout';
import Button from '../components/Button';

export default function Profile(props) {

  const { email } = props
  const title = "Profile";

  return(
  <>
    <Layout title={title} email={email}>
      <p>Profile</p>
    </Layout>
  </>
  );
}


Profile.getInitialProps = async ({ req, res }) => {
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