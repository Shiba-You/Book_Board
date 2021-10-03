// import Router from "next/router";

// export default async function getCurrentUser(req, res) {
//   const isServerSide = typeof window === "undefined";
//   if (isServerSide && req && res) {
//     const root = "http://localhost:3000";
//     const options = { headers: { cookie: req.headers.cookie || "" } };
//     const result = await fetch(`${root}/loggedIn`, options);
//     const json = (await result.json())
//     if (!json.user) {
//       res.writeHead(302, { Location: "/login" });
//       res.end();
//     }
//     return { 
//       currentUser: (json.user || {}).currentUser || ""
//     };
//   }
//   if (!isServerSide) {
//     const result = await fetch("/loggedIn");
//     const json = (await result.json())
//     if (!json.user) Router.push({pathname: "/login"});
//     return { 
//       currentUser: (json.user || {}).currentUser || ""
//     };
//   }
//   return { 
//     currentUser: ""
//   };
// }