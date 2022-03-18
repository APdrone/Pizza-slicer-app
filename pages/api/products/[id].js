import dbConnect from "../../../util/dbConnect";
import Product from "../../../models/ProductModel";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const product = await Product.findById(id);
        res.status(200).json(product);
      } catch (err) {
        res.status(500).json({ sucess: false, err });
      }
      break;
    case "PUT":
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
    case "DELETE":
      if (!token || token !== process.env.TOKEN) {
        return res.status(401).json("Not authorised");
      }
      try {
        await Product.findByIdAndDelete(id);
        res.status(201).json("The product has been deleted!");
      } catch (err) {
        res.status(500).json({ sucess: false, err });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
}
