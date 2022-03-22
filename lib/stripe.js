import Stripe from "stripe";

// return the stripe object
export const stripe = new Stripe(
  "sk_test_51KRVrPKjSOnd0pYCfsLYbzb3h1NJJRi0eaNr6JYBBJIl5H74aOHAG9xfik0RKVYhReCM2lex1QuKCaQIjRslG5pm00CQ2V1Gam",
  {
    apiVersion: "2020-08-27",
  }
);
