import { Flex, Center, Heading, Text } from "@chakra-ui/react";

const VerifyRequest = () => {
  return (
    <Flex h={"90vh"} direction={"column"} align={"center"} justify={"center"}>
      <Heading as={"h1"}>Check your email!</Heading>
      <Text as={"p"}>
        A verification mail has been sent to your email account. Please check
        you inbox to verify.
      </Text>
    </Flex>
  );
};

export default VerifyRequest;
