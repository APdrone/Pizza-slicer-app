import cookie from "cookie";

// import dbConnect from "../../util/dbConnect";
// import Order from "../../../models/OrderModel";

export default async function handler(req, res) {
  const { method } = req;

  // await dbConnect();

  // console.log(req.body.username, req.body.password);
  // console.log(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);

  switch (method) {
    case "POST":
      const { username, password } = req.body;
      if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
      ) {
        res.setHeader(
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
