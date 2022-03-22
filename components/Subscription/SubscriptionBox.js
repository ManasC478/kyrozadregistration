import { useEffect, useState } from "react";
import Image from "next/image";
import {
  WrapItem,
  Box,
  Stack,
  Flex,
  Text,
  Divider,
  List,
  ListItem,
  ListIcon,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Center,
  useToast,
  chakra,
} from "@chakra-ui/react";
import { CheckIcon } from "../../styles/icons";
import { useRouter } from "next/router";

const SubscriptionBox = ({ product, price, user, createCheckout }) => {
  const toast = useToast();
  const router = useRouter();
  const ProductImage = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const open = () => setIsOpen(!isOpen);

  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unitAmount || 0) / 100);

  const handleCheckout = async () => {
    setButtonLoading(true);

    // if subscription push to account page

    try {
      await createCheckout({ price });
    } catch (error) {
      console.log("components/subscription/subscriptiobBox: ", error.message);

      // if error is 5xx then redirect to 500 server error page
      if (error.status >= 500) {
        return router.push(`/500?message=${error.message}`);
      } else if (error.status >= 400) {
        toast({
          title: "Subscription failed",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        return router.push(`/500?message=${error.message}`);
      }
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <WrapItem>
      <Box w={64} borderRadius={"2xl"} boxShadow={"lg"} bg={"gray.100"} p={8}>
        <Stack spacing={4}>
          <Stack isInline spacing={7} align={"center"}>
            <ProductImage
              width={65}
              height={65}
              src={product.image}
              alt='not found'
              borderRadius={"xl"}
            />
            <Box py={2}>
              <Text as={"h4"} fontWeight={"medium"} fontSize={"lg"}>
                {product.name}
              </Text>
              <Flex align={"baseline"}>
                <Text fontWeight={"medium"} fontSize={"2xl"}>
                  {priceString}
                </Text>
                <Text color={"gray.600"} fontSize={"sm"}>
                  /month
                </Text>
              </Flex>
            </Box>
          </Stack>
          <Divider color={"gray.300"} />
          <Box>{product.description}</Box>
          <Center>
            {user ? (
              <Button
                isLoading={buttonLoading}
                onClick={handleCheckout}
                disabled={buttonLoading ? true : false}
                py={7}
                borderRadius={"xl"}
                bg={"red.500"}
                color={"white"}
                _hover={{ bg: "red.600" }}
              >
                Choose Plan
              </Button>
            ) : (
              <SubscriptionButtonPopover open={open}>
                <Button
                  isLoading={buttonLoading}
                  onClick={open}
                  disabled={buttonLoading ? true : false}
                  py={7}
                  borderRadius={"xl"}
                  bg={"red.500"}
                  color={"white"}
                  _hover={{ bg: "red.600" }}
                >
                  Choose Plan
                </Button>
              </SubscriptionButtonPopover>
            )}
          </Center>
        </Stack>
      </Box>
    </WrapItem>
  );
};

const SubscriptionButtonPopover = ({ children, isOpen, open }) => (
  <Popover isOpen={isOpen} placement='bottom' _focus={{ outline: 0 }}>
    <PopoverTrigger>{children}</PopoverTrigger>
    <PopoverContent w={"100px"} color={"white"} bg={"red.200"}>
      <PopoverArrow bg={"red.200"} />
      <Center>
        <PopoverBody fontWeight={"medium"} fontSize={"sm"}>
          Signin first
        </PopoverBody>
      </Center>
    </PopoverContent>
  </Popover>
);

export default SubscriptionBox;
