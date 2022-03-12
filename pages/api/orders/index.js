import dbConnect from "../../../util/dbConnect";
import Order from "../../../models/OrderModel";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const orders = await Order.find();
        res.status(200).json(orders);
      } catch (err) {
        res.status(500).json({ sucess: false, err });
      }
      break;
    case "POST":
      try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
      } catch (err) {
        res.status(500).json({ sucess: false, err });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
}
