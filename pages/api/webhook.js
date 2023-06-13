import { connectMongoose } from "../../lib/mongoose";
import { buffer } from "micro";
import Order from "../../models/Order";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
     await connectMongoose();
     const siginingSerect = process.env.siginingSecret;
     const payload = await buffer(req);
     const signature = req.headers["stripe-signature"];
     const event = stripe.webhooks.constructEvent(
          payload,
          signature,
          siginingSerect
     );
     if (event?.type === "checkout.session.completed") {
          console.log("completeeeeeeeeed");
          const metadata = event.data?.object?.metadata;
          const paymentStatus = event.data?.object?.payment_status;
          if (metadata?.orderId && paymentStatus === "paid") {
               const order = await Order.findByIdAndUpdate(metadata.orderId, {
                    paid: 1,
               });
          }
     }
     res.json("ok");
}
export const config = {
     api: {
          bodyParser: false,
     },
};
