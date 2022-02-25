import {
  SimpleGrid,
  Box,
  Button,
  Icon,
  Stack,
  Heading,
  Flex,
  Text,
  List,
  ListItem,
  ListIcon,
  Divider,
} from "@chakra-ui/react";
import { CheckIcon } from "../styles/icons";

// import components
import SubscriptionBox from "../components/Subscription/SubscriptionBox";

const Prices = () => {
  return (
    // <div style={{ marginTop: "4rem", marginBottom: "4rem" }}>
    //   <div
    //     className='row d-md-flex flex-row flex-wrap justify-content-md-center align-items-md-center'
    //     style={{ marginTop: "2rem" }}
    //   >
    //     <div
    //       className='col'
    //       style={{ marginLeft: "8%", borderRightStyle: "solid" }}
    //     >
    //       <div className='text-center'>
    //         <h1>Free trail</h1>
    //         <h6 className='display-6' style={{ fontSize: "44.1px" }}>
    //           $0
    //         </h6>
    //         <h6 className='display-6'>7 days</h6>
    //         <hr style={{ height: "4px" }} />
    //         <p style={{ margin: "15px" }}>
    //           <br />
    //           Lorem ipsum dolor sit amet consectetur adipisicing elit.
    //           Inventore, nobis adipisci veritatis architecto at voluptatibus
    //           harum cumque natus quasi molestiae, omnis magni ea facilis
    //           excepturi fuga nam asperiores! Alias eos consequatur corrupti
    //           sequi reprehenderit! Autem dolores repudiandae fuga inventore
    //           tempore pariatur. Reiciendis, voluptatum fugiat pariatur a sint
    //           distinctio eligendi tempora?
    //           <br />
    //           <br />
    //         </p>
    //         <button className='btn btn-dark' type='button'>
    //           Get Plan
    //         </button>
    //       </div>
    //     </div>
    //     <div className='col' style={{ borderRightStyle: "solid" }}>
    //       <div className='text-center'>
    //         <h1>Free trail</h1>
    //         <h6 className='display-6' style={{ fontSize: "44.1px" }}>
    //           $0
    //         </h6>
    //         <h6 className='display-6'>7 days</h6>
    //         <hr style={{ height: "4px" }} />
    //         <p style={{ margin: "15px" }}>
    //           <br />
    //           Lorem ipsum dolor sit amet consectetur adipisicing elit.
    //           Inventore, nobis adipisci veritatis architecto at voluptatibus
    //           harum cumque natus quasi molestiae, omnis magni ea facilis
    //           excepturi fuga nam asperiores! Alias eos consequatur corrupti
    //           sequi reprehenderit! Autem dolores repudiandae fuga inventore
    //           tempore pariatur. Reiciendis, voluptatum fugiat pariatur a sint
    //           distinctio eligendi tempora?
    //           <br />
    //           <br />
    //         </p>
    //         <button className='btn btn-dark' type='button'>
    //           Get Plan
    //         </button>
    //       </div>
    //     </div>
    //     <div className='col' style={{ borderRightStyle: "solid" }}>
    //       <div className='text-center'>
    //         <h1>Free trail</h1>
    //         <h6 className='display-6' style={{ fontSize: "44.1px" }}>
    //           $0
    //         </h6>
    //         <h6 className='display-6'>7 days</h6>
    //         <hr style={{ height: "4px" }} />
    //         <p style={{ margin: "15px" }}>
    //           <br />
    //           Lorem ipsum dolor sit amet consectetur adipisicing elit.
    //           Inventore, nobis adipisci veritatis architecto at voluptatibus
    //           harum cumque natus quasi molestiae, omnis magni ea facilis
    //           excepturi fuga nam asperiores! Alias eos consequatur corrupti
    //           sequi reprehenderit! Autem dolores repudiandae fuga inventore
    //           tempore pariatur. Reiciendis, voluptatum fugiat pariatur a sint
    //           distinctio eligendi tempora?
    //           <br />
    //           <br />
    //         </p>
    //         <button className='btn btn-dark' type='button'>
    //           Get Plan
    //         </button>
    //       </div>
    //     </div>
    //     <div className='col' style={{ marginRight: "8%" }}>
    //       <div className='text-center'>
    //         <h1>Free trail</h1>
    //         <h6 className='display-6' style={{ fontSize: "44.1px" }}>
    //           $0
    //         </h6>
    //         <h6 className='display-6'>7 days</h6>
    //         <hr style={{ height: "4px" }} />
    //         <p style={{ margin: "15px" }}>
    //           <br />
    //           Lorem ipsum dolor sit amet consectetur adipisicing elit.
    //           Inventore, nobis adipisci veritatis architecto at voluptatibus
    //           harum cumque natus quasi molestiae, omnis magni ea facilis
    //           excepturi fuga nam asperiores! Alias eos consequatur corrupti
    //           sequi reprehenderit! Autem dolores repudiandae fuga inventore
    //           tempore pariatur. Reiciendis, voluptatum fugiat pariatur a sint
    //           distinctio eligendi tempora?
    //           <br />
    //           <br />
    //         </p>
    //         <button className='btn btn-dark' type='button'>
    //           Get Plan
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
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
        <SimpleGrid columns={3} gap={5}>
          <Box borderRadius={"2xl"} boxShadow={"lg"} bg={"gray.100"} p={8}>
            <Stack spacing={4}>
              <Stack isInline spacing={7} align={"center"}>
                <Box w={65} h={65} bg={"teal.500"} borderRadius={"xl"}></Box>
                <Box py={2}>
                  <Text as={"h4"} fontWeight={"medium"} fontSize={"lg"}>
                    Free
                  </Text>
                  <Flex align={"baseline"}>
                    <Text fontWeight={"medium"} fontSize={"2xl"}>
                      $0
                    </Text>
                    <Text color={"gray.600"} fontSize={"sm"}>
                      /month
                    </Text>
                  </Flex>
                </Box>
              </Stack>
              <Divider color={"gray.300"} />
              <List spacing={1}>
                <ListItem>
                  <ListIcon as={CheckIcon} /> Unlimited ads
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} /> Unlimited ads
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} /> Unlimited ads
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

          <Box
            borderRadius={"2xl"}
            boxShadow={"lg"}
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
          <Box borderRadius={"2xl"} boxShadow={"lg"} bg={"gray.100"} p={8}>
            <Stack spacing={4}>
              <Stack isInline spacing={7} align={"center"}>
                <Box w={65} h={65} bg={"teal.500"} borderRadius={"xl"}></Box>
                <Box py={2}>
                  <Text as={"h4"} fontWeight={"medium"} fontSize={"lg"}>
                    Free
                  </Text>
                  <Flex align={"baseline"}>
                    <Text fontWeight={"medium"} fontSize={"2xl"}>
                      $0
                    </Text>
                    <Text color={"gray.600"} fontSize={"sm"}>
                      /month
                    </Text>
                  </Flex>
                </Box>
              </Stack>
              <Divider color={"gray.300"} />
              <List spacing={1}>
                <ListItem>
                  <ListIcon as={CheckIcon} /> Unlimited ads
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} /> Unlimited ads
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} /> Unlimited ads
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
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default Prices;
