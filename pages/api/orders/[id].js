import dbConnect from "../../../util/dbConnect";
import Order from "../../../models/OrderModel";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const order = await Order.findById(id);
        res.status(200).json(order);
      } catch (err) {
        res.status(500).json({ sucess: false, err });
      }
      break;
    case "PUT":
      try {
        const order = await Order.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(200).json(order);
      } catch (err) {
        res.status(500).json({ sucess: false, err });
      }
      break;
    case "DELETE":
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
