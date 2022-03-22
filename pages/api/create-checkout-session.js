import { stripe } from "../../lib/stripe";
import getAppUrl from "../../utils/appUrl";
import { createOrRetrieveCustomer } from "../../lib/mongodb/mongodb-stripe-admin";
import { getUser } from "../../lib/dbUser";

export default async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      success: false,
      status: 405,
      message: "Request method not accepted.",
    });
  }

  const { id, price, quantity = 1, metadata = {} } = req.body;

  try {
    // get user data and fetch the user's customer data, if not there create one
    const user = await getUser(id);

    const customer = await createOrRetrieveCustomer({
      userId: user?._id || "",
      email: user?.email || "",
    });

    // create stripe checkout session and return it to client
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer,
      line_items: [
        {
          price: price.stripePriceId,
          quantity,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      subscription_data: {
        trial_from_plan: true,
        metadata,
      },
      success_url: `${getAppUrl()}/dashboard`,
      cancel_url: `${getAppUrl()}/subscriptions`,
    });

    res.status(200).json({
      success: true,
      status: 200,
      sessionId: session.id,
    });
  } catch (error) {
    console.log("pages/api/create-checkout-session: ", error.message);

    res
      .status(500)
      .json({ success: false, status: 500, message: error.message });
  }
};
