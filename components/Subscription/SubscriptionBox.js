import {
  Box,
  Stack,
  Flex,
  Text,
  Divider,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";
import { CheckIcon } from "../../styles/icons";

const SubscriptionBox = ({ isPopular, subscription }) => {
  return (
    <Box
      borderRadius={"2xl"}
      boxShadow={"lg"}
      bg={"gray.100"}
      p={8}
      bg={"gray.800"}
      transform={"scale(1.2)"}
      zIndex={1}
    >
      <Stack spacing={4} color={"gray.400"}>
        <Stack isInline spacing={7} align={"center"} color={"white"}>
          <Box w={65} h={65} bg={"teal.500"} borderRadius={"xl"}></Box>
          <Box py={2}>
            <Text as={"h4"} fontWeight={"medium"} fontSize={"lg"}>
              Free
            </Text>
            <Flex align={"baseline"}>
              <Text fontWeight={"medium"} fontSize={"2xl"}>
                $0
              </Text>
              <Text color={"gray.500"} fontSize={"sm"}>
                /month
              </Text>
            </Flex>
          </Box>
        </Stack>
        <Divider color={"gray.300"} />
        <List spacing={1}>
          <ListItem>
            <ListIcon color={"white"} as={CheckIcon} /> Unlimited ads
          </ListItem>
          <ListItem>
            <ListIcon color={"white"} as={CheckIcon} /> Unlimited ads
          </ListItem>
          <ListItem>
            <ListIcon color={"white"} as={CheckIcon} /> Unlimited ads
          </ListItem>
        </List>
        <Button
          py={7}
          borderRadius={"xl"}
          bg={"red.500"}
          color={"white"}
          _hover={{ bg: "red.600" }}
        >
          Choose Plan
        </Button>
      </Stack>
    </Box>
  );
};

export default SubscriptionBox;
