import { Flex, Text, Heading } from "@chakra-ui/react";

const InternalError = () => {
  return (
    <Flex
      maxW={1200}
      mx={"auto"}
      minH={"100vh"}
      direction={"column"}
      justify={"center"}
      align={"center"}
    >
      <Heading>500 Internal Server Error</Heading>
      <Text>There was an error, please try again later.</Text>
    </Flex>
  );
};

export default InternalError;
