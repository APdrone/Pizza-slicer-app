import dbConnect from "../../../util/dbConnect";
import Product from "../../../models/ProductModel";

export default async function handler(req, res) {
  const { method, cookies } = req;

  const token = cookies.token;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const products = await Product.find();
        res.status(200).json(products);
      } catch (err) {
        res.status(500).json({ sucess: false, err });
      }
      break;
    case "POST":
      if (!token || token !== process.env.TOKEN) {
        return res.status(401).json("Not authorised");
      }
      try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
      } catch (err) {
        res.status(500).json({ sucess: false, err });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
}
