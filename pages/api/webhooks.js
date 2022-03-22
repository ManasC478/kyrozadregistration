import { stripe } from "../../lib/stripe";
import {
  upsertProduct,
  deleteProduct,
  upsertPrice,
  deletePrice,
  manageSubscriptionStatusChange,
} from "../../lib/mongodb/mongodb-stripe-admin";

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

// all the stripe events should be in this set
const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "product.deleted",
  "price.created",
  "price.updated",
  "price.deleted",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export default async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      success: false,
      status: 405,
      message: "Request method not accepted.",
    });
  }

  const buf = await buffer(req);

  let event;
  // this is the test webhook secret that will be provided in the stripe cli. look at stripe webhook docs
  const webhookSecret = [WEBHOOK_SECRET]; // replace this with your secret

  if (webhookSecret) {
    const signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(buf, signature, webhookSecret);
    } catch (error) {
      console.log("/pages/api/webhooks: ", error.message);
      return res
        .status(400)
        .json({ message: `Webhook Error: ${error.message}` });
    }
  }

  // handle the events
  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "product.created":
        case "product.updated":
          await upsertProduct(event.data.object);
          break;
        case "product.deleted":
          await deleteProduct(event.data.object.id);
          break;
        case "price.created":
        case "price.updated":
          await upsertPrice(event.data.object);
          break;
        case "price.deleted":
          await deletePrice(event.data.object.id);
          break;
        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          const subscription = event.data.object;
          await manageSubscriptionStatusChange(
            subscription.id,
            subscription.customer,
            event.type === "customer.subscription.created"
          );
          break;
        case "checkout.session.completed":
          const checkoutSession = event.data.object;
          if (checkoutSession.mode === "subscription") {
            const subscriptionId = checkoutSession.subscription;
            await manageSubscriptionStatusChange(
              subscriptionId,
              checkoutSession.customer,
              true
            );
          }
          break;
        default:
          throw new Error("Unhandled relevant event!");
      }

      return res.status(200).json({
        success: true,
        status: 200,
        message: "Webhook event handled.",
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Webhook error: "Webhook handler failed. View logs."',
      });
    }
  }

  res.status(400).json({
    message: 'Webhook error: "Event not processed by application"',
  });
};
