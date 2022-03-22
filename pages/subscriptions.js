import { Box, Stack, Heading, Text, Wrap } from "@chakra-ui/react";
import { getActiveProductsWithPrices } from "../lib/mongodb/mongodb-stripe-admin";
import { useUser } from "../lib/CustomHooks/useUser";

// import components
import SubscriptionBox from "../components/Subscription/SubscriptionBox";
import SkeletonSubscriptionBox from "../components/Subscription/SkeletonSubscriptionBox";

const Prices = ({ products }) => {
  const { user, isLoading, createCheckout, subscription } = useUser();
  return (
    <Box maxW={850} py={20} mx={"auto"} mb={20}>
      <Stack spacing={10}>
        <Stack spacing={3} align={"center"} mb={10}>
          <Heading as={"h1"} fontWeight={"medium"}>
            <Text color={"purple.600"} d={"inline"}>
              Flexible
            </Text>{" "}
            Plans
          </Heading>
          <Text color={"gray.500"} fontSize={"md"} w={300} textAlign={"center"}>
            Choose a plan that works best for you and your team.
          </Text>
        </Stack>
        <Wrap spacing={10} align={"center"} justify={"center"}>
          {products.map((product, index) => {
            const price = product?.prices[0];
            if (!price) return null;

            if (isLoading) {
              return <SkeletonSubscriptionBox key={index} />;
            }

            return (
              <SubscriptionBox
                key={index}
                product={product}
                price={price}
                user={user}
                subscription={subscription}
                isLoading={isLoading}
                createCheckout={createCheckout}
              />
            );
          })}
        </Wrap>
      </Stack>
    </Box>
  );
};

export async function getStaticProps() {
  const products = await getActiveProductsWithPrices();

  return {
    props: {
      products,
    },
    revalidate: 60,
  };
}

export default Prices;
