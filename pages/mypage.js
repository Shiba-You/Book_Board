import Router, { useRouter } from "next/router";

import Layout from '../components/template/layout';
import Button from '../components/Button';
import router from "next/router";

export default function Mypage(props) {

  const { email } = props
  const title = "Mypage";

  return(
  <>
    <Layout title={title} email={email}>
      <p>Mypage</p>
      <button
        onClick={()=>console.log(email)}
      >
      </button>
      {email &&(
        <>
          <p>
            {email}
          </p>
          <Button seed="add" twin="0" />
          <Button seed="cancel" twin="1" />
        </>
      )}
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
