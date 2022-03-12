import cookie from "cookie";

import dbConnect from "../../../util/dbConnect";
import Order from "../../../models/OrderModel";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      const { username, password } = req.body;
      if (
        username === process.env.USERNAME &&
        password === process.env.PASSWORD
      ) {
        res.setHeaders(
          "Set-Cookie",
          cookie.serialize("token", process.env.TOKEN, {
            maxAge: 60 * 60,
            sameSite: "strict",
            path: "/",
          })
        );
        res.status(200).json("success");
      } else {
        res.status(400).json("wrong credentials!");
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
}
