import { setCookie } from "nookies";
import { firebaseAdmin } from "./firebaseAdmin"; 

export default async function sessionApi(req, res) {
  if (req.method !== "POST") return res.status(404).send("Not Found");
  
  const auth = firebaseAdmin.auth();
  const expiresIn = 60 * 30 * 1000;
  const id = (JSON.parse(req.body).id || "").toString();
  const sessionCookie = await auth.createSessionCookie(id, { expiresIn });

  const options = {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
    path: "/",
  };

  setCookie({ res }, "session", sessionCookie, options);

  res.send(JSON.stringify({ status: "success" }));
}