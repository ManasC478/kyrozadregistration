import dbConnect from "./mongodbConnect";
import mongoose from "mongoose";
import { Product, Price, Customer, Subscription, User } from "../../models";
import { stripe } from "../stripe";
import toDateTime from "../../utils/toDateTime";

// upsert the stripe product
export const upsertProduct = async (product) => {
  try {
    await dbConnect();

    const productData = {
      stripeProductId: product.id,
      active: product.active,
      name: product.name,
      description: product.description ?? null,
      image: product.images?.[0] ?? null,
      metadata: product.metadata,
    };

    await Product.findOneAndUpdate(
      { stripeProductId: product.id },
      productData,
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.log(
      "/lib/mongodb/mongodb-stripe-admin/upsertProduct: ",
      error.message
    );
    throw new Error(error.message);
  }
};

// delete stripe product
export const deleteProduct = async (productId) => {
  try {
    await dbConnect();

    await Product.deleteOne({ stripeProductId: productId });
  } catch (error) {
    console.log(
      "/lib/mongodb/mongodb-stripe-admin/deleteProduct: ",
      error.message
    );
    throw new Error(error.message);
  }
};

// upsert the stripe price
export const upsertPrice = async (price) => {
  try {
    await dbConnect();

    const priceData = {
      stripePriceId: price.id,
      stripeProductId: typeof price.product === "string" ? price.product : "",
      active: price.active,
      currency: price.currency,
      description: price.nickname ?? undefined,
      type: price.type,
      unitAmount: price.unit_amount ?? undefined,
      interval: price.recurring?.interval,
      intervalCount: price.recurring?.interval_count,
      trialPeriodDays: price.recurring?.trial_period_days,
      metadata: price.metadata,
    };

    await Price.findOneAndUpdate({ stripePriceId: price.id }, priceData, {
      upsert: true,
    });
  } catch (error) {
    console.log(
      "/lib/mongodb/mongodb-stripe-admin/upsertPrice: ",
      error.message
    );
    throw new Error(error.message);
  }
};

// delete the stripe price
export const deletePrice = async (priceId) => {
  try {
    await dbConnect();

    await Price.deleteOne({ stripePriceId: priceId });
  } catch (error) {
    console.log(
      "/lib/mongodb/mongodb-stripe-admin/deletePrice: ",
      error.message
    );
    throw new Error(error.message);
  }
};

// update the user billing and payment fields based off of stripe's customer data
const copyBillingDetailsToCustomer = async (userId, paymentMethod) => {
  await dbConnect();

  try {
    const customer = paymentMethod.customer;
    const { name, phone, address } = paymentMethod.billing_details;
    if (!name || !phone || !address) return;

    await stripe.customers.update(customer, { name, phone, address });
    await User.updateOne(
      { _id: userId },
      {
        billingAddress: address,
        paymentMethod: paymentMethod[paymentMethod.type],
      }
    );
  } catch (error) {
    console.log(
      "/lib/mongodb/mongodb-stripe-admin/copyBillingDetailsToCustomer: ",
      error.message
    );
    throw new Error(error.message);
  }
};

// create or update the user's subscription status
export const manageSubscriptionStatusChange = async (
  subscriptionId,
  customerId,
  createAction = false
) => {
  try {
    await dbConnect();

    const customer = await Customer.findOne({
      stripeCustomerId: customerId,
    }).exec();

    const { userId } = customer || {};

    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["default_payment_method"],
    });

    const ObjectId = mongoose.Types.ObjectId;

    const subscriptionData = {
      stripeSubscriptionId: subscription.id,
      userId: ObjectId(userId),
      metadata: subscription.metadata,
      status: subscription.status,
      stripePriceId: subscription.items.data[0].price.id,
      quantity: subscription.quantity,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      cancelAt: subscription.cancel_at
        ? toDateTime(subscription.cancel_at)
        : null,
      canceledAt: subscription.canceled_at
        ? toDateTime(subscription.canceled_at)
        : null,
      currentPeriodStart: toDateTime(subscription.current_period_start),
      currentPeriodEnd: toDateTime(subscription.current_period_end),
      createdAt: toDateTime(subscription.created),
      endedAt: subscription.ended_at ? toDateTime(subscription.ended_at) : null,
      trialStart: subscription.trial_start
        ? toDateTime(subscription.trial_start)
        : null,
      trialEnd: subscription.trial_end
        ? toDateTime(subscription.trial_end)
        : null,
    };

    console.log("subscription: ", subscriptionData);

    await Subscription.findOneAndUpdate(
      { stripeSubscriptionId: subscription.id },
      subscriptionData,
      {
        upsert: true,
      }
    );

    // For a new subscription copy the billing details to the customer object.
    // NOTE: This is a costly operation and should happen at the very end.
    if (createAction && subscription.default_payment_method && userId) {
      await copyBillingDetailsToCustomer(
        userId,
        subscription.default_payment_method
      );
    }
  } catch (error) {
    console.log(
      "/lib/mongodb/mongodb-stripe-admin/manageSubscriptionStatusChange: ",
      error.message
    );
    throw new Error(error.message);
  }
};

// fetch all the active products
export const getActiveProductsWithPrices = async () => {
  try {
    const products = await Product.aggregate([
      { $match: { active: true } },
      {
        $lookup: {
          from: "prices",
          let: { stripe_product_id: "$stripeProductId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$stripeProductId", "$$stripe_product_id"] },
                    { $eq: ["$active", true] },
                  ],
                },
              },
            },
            { $project: { _id: 0 } },
          ],
          as: "prices",
        },
      },
      { $sort: { "prices.unitAmount": 1 } },
    ]);

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.log(
      "/lib/mongodb/mongodb-stripe-admin/getActiveProductsWithPrices: ",
      error.message
    );
    throw new Error(error.message);
  }
};

// get the user subscription
export const getUserSubscription = async (id) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;

    // incomplete aggregation query - doesn't grab the price and product associated with the subscription.
    // Right now it only queries the subscription
    const subscription = await Subscription.aggregate([
      { $match: { userId: ObjectId(id) } },
      {
        $lookup: {
          from: "prices",
          localField: "stripePriceId",
          foreignField: "stripePriceId",
          as: "prices",
        },
      },
    ]);

    return JSON.parse(JSON.stringify(subscription));
  } catch (error) {
    console.log(
      "/lib/mongodb/mongodb-stripe-admin/getUserSubscription: ",
      error.message
    );
    throw new Error(error.message);
  }
};

// retrieves customer and creates one if not already there
export const createOrRetrieveCustomer = async ({ email, userId }) => {
  try {
    const customer = await Customer.findOne({
      userId,
    }).exec();

    // if no customer then create one
    if (!customer) {
      const customerData = {
        email: email || null,
        metadata: {
          userId,
        },
      };

      const newCustomer = await stripe.customers.create(customerData);
      await Customer.create({ userId, stripeCustomerId: newCustomer.id });

      return newCustomer.id;
    }

    if (customer) return customer.stripeCustomerId;
  } catch (error) {
    console.log(
      "/lib/mongodb/mongodb-stripe-admin/createOrRetrieveCustomer: ",
      error.message
    );
    throw new Error(error.message);
  }
};
