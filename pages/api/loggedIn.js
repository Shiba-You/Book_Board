import { parseCookies } from "nookies";
import { firebaseAdmin } from "./firebaseAdmin";

export default async function meApi(req, res) {
  const sessionId = parseCookies({ req }).session;
  if (req.method !== "GET") return res.status(404).send("Not Found");
  if (!sessionId) return res.json({});

  const auth = firebaseAdmin.auth();

  const user = await auth
    .verifySessionCookie(sessionId, true)
    .catch(() => null);

  res.json(user ? { user: { email: user.email } } : {});
}