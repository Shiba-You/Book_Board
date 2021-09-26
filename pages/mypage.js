import Router from "next/router";

import Layout from '../components/template/layout';
import FloatButton from '../components/FloatButton';


export default function Mypage(props) {
  const { currentUser } = props
  const title = "Mypage";

  return(
  <>
    <Layout title={title} currentUser={currentUser}>
      <p>Mypage</p>
      <button
        onClick={()=>console.log(currentUser)}
      />
      {currentUser &&(
        <>
          <FloatButton seed="add" twin="0" />
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
