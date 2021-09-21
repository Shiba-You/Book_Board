import Router, { useRouter } from "next/router";

import Layout from '../components/template/layout';

export default function New(props) {
  const { email } = props
  const title = "Add new book";

  return(
  <>
    <Layout title={title} email={email}>
      <p>New book</p>
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