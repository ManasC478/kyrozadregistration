import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import NavLink from "next/link";
import {
  Flex,
  Box,
  Badge,
  Code,
  Stack,
  Image,
  Button,
  SimpleGrid,
  Heading,
  Text,
  Divider,
  Switch,
  Icon,
  IconButton,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { SmallAddIcon, CopyIcon } from "@chakra-ui/icons";
import {
  MoneyIcon,
  MoreInfoIcon,
  UsersReachedIcon,
  UsersClickedIcon,
  ImpressionsIcon,
  SortIcon,
} from "../styles/icons";

import AdTableSkeleton from "../components/AdTableSkeleton";
import AdTable from "../components/AdTable";

const Dashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  return (
    <Box py={10} maxW={1200} mx={"auto"}>
      <Stack spacing={10}>
        <Box>
          <Heading mb={5}>Dashboard</Heading>
          <Stack spacing={10}>
            <Box>
              <Text mb={5} fontWeight={"medium"} color={"gray.500"}>
                Analytics
              </Text>
              <SimpleGrid columns={4} spacing={20}>
                {/* total costs box */}
                <Stack
                  spacing={2}
                  bg={"white"}
                  p={7}
                  boxShadow={"md"}
                  borderRadius={"3xl"}
                  pos={"relative"}
                  bg={"purple.200"}
                >
                  <MoneyIcon boxSize={14} color={"purple.600"} />
                  <Text fontWeight={"normal"} color={"purple.600"}>
                    Total Costs
                  </Text>
                  <StatGroup>
                    <Stat>
                      <StatNumber>$123</StatNumber>
                      <StatHelpText>
                        <StatArrow type='increase' />
                        12.5%
                      </StatHelpText>
                    </Stat>
                  </StatGroup>
                  <IconButton
                    bg={"none"}
                    aria-label='icon'
                    icon={<MoreInfoIcon fontSize={"2xl"} color={"gray.500"} />}
                    size='md'
                    isRound
                    pos={"absolute"}
                    top={1}
                    right={3}
                  />
                </Stack>
                {/* total users reached box */}
                <Stack
                  spacing={2}
                  bg={"white"}
                  p={7}
                  boxShadow={"md"}
                  borderRadius={"3xl"}
                  pos={"relative"}
                  bg={"teal.200"}
                >
                  <UsersReachedIcon boxSize={14} color={"teal.600"} />
                  <Text fontWeight={"normal"} color={"teal.600"}>
                    Total Users Reached
                  </Text>
                  <StatGroup>
                    <Stat>
                      <StatNumber>50</StatNumber>
                      <StatHelpText>
                        <StatArrow type='decrease' />
                        1.5%
                      </StatHelpText>
                    </Stat>
                  </StatGroup>
                  <IconButton
                    bg={"none"}
                    aria-label='icon'
                    icon={<MoreInfoIcon fontSize={"2xl"} color={"gray.500"} />}
                    size='md'
                    isRound
                    pos={"absolute"}
                    top={1}
                    right={3}
                  />
                </Stack>
                {/* total users clicked box */}
                <Stack
                  spacing={2}
                  bg={"white"}
                  p={7}
                  boxShadow={"md"}
                  borderRadius={"3xl"}
                  pos={"relative"}
                  bg={"cyan.200"}
                >
                  <UsersClickedIcon boxSize={14} color={"cyan.600"} />
                  <Text fontWeight={"normal"} color={"cyan.600"}>
                    Total Users Clicked
                  </Text>
                  <StatGroup>
                    <Stat>
                      <StatNumber>3</StatNumber>
                      <StatHelpText>
                        <StatArrow type='decrease' />
                        0.1%
                      </StatHelpText>
                    </Stat>
                  </StatGroup>
                  <IconButton
                    bg={"none"}
                    aria-label='icon'
                    icon={<MoreInfoIcon fontSize={"2xl"} color={"gray.500"} />}
                    size='md'
                    isRound
                    pos={"absolute"}
                    top={1}
                    right={3}
                  />
                </Stack>
                {/* net impressions box */}
                <Stack
                  spacing={2}
                  bg={"white"}
                  p={7}
                  boxShadow={"md"}
                  borderRadius={"3xl"}
                  pos={"relative"}
                  bg={"gray.200"}
                >
                  <ImpressionsIcon boxSize={14} color={"gray.600"} />
                  <Text fontWeight={"normal"} color={"gray.600"}>
                    Net Impressions
                  </Text>
                  <StatGroup>
                    <Stat>
                      <StatNumber>5</StatNumber>
                      <StatHelpText>
                        <StatArrow type='increase' />
                        15%
                      </StatHelpText>
                    </Stat>
                  </StatGroup>
                  <IconButton
                    bg={"none"}
                    aria-label='icon'
                    icon={<MoreInfoIcon fontSize={"2xl"} color={"gray.500"} />}
                    size='md'
                    isRound
                    pos={"absolute"}
                    top={1}
                    right={3}
                  />
                </Stack>
              </SimpleGrid>
            </Box>
          </Stack>
        </Box>
        <Box p={10} bg={"white"} boxShadow={"md"} borderRadius={"3xl"}>
          <Flex justifyContent='space-between' alignItems='center' mb={5}>
            <Text fontWeight={"medium"} color={"gray.500"}>
              Ads
            </Text>
            <Stack spacing={2} isInline alignItems='center'>
              <Menu>
                <MenuButton as={Button} leftIcon={<SortIcon />}>
                  Sort
                </MenuButton>
                <MenuList>
                  <MenuItem>Updated Date (Newest)</MenuItem>
                  <MenuItem>Updated Date (Oldest)</MenuItem>
                </MenuList>
              </Menu>
              <NavLink href='/ad/create' passHref>
                <Button
                  variant='solid'
                  bg={"black"}
                  color={"white"}
                  size='md'
                  leftIcon={<SmallAddIcon />}
                  _hover={{ bg: "gray.700" }}
                >
                  Create Ad
                </Button>
              </NavLink>
            </Stack>
          </Flex>
          <Table vairant={"simple"}>
            <Thead>
              <Tr>
                <Th>Updated Date</Th>
                <Th>Ad Name</Th>
                <Th>Users Reached</Th>
                <Th>Users Clicked</Th>
                <Th>Status</Th>
                <Th>{""}</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Jan 2, 2022</Td>
                <Td>
                  <Stack spacing={2}>
                    <Text>Ad name</Text>
                    <Code
                      textAlign={"center"}
                      bg={"green.100"}
                      color={"green.500"}
                      borderRadius={"full"}
                      variant='solid'
                      fontWeight={"medium"}
                      fontSize={"xs"}
                    >
                      ACTIVE
                    </Code>
                  </Stack>
                </Td>
                <Td>7</Td>
                <Td>3</Td>
                <Td>
                  <Switch size='lg' />
                </Td>
                <Td>
                  <Image height='100px' width='100px' />
                </Td>
              </Tr>
              <Tr>
                <Td>Jan 2, 2022</Td>
                <Td>
                  <Stack spacing={2}>
                    <Text>Ad name</Text>
                    <Code
                      textAlign={"center"}
                      bg={"red.100"}
                      color={"red.500"}
                      borderRadius={"full"}
                      variant='solid'
                      fontWeight={"medium"}
                      fontSize={"xs"}
                    >
                      CLOSED
                    </Code>
                  </Stack>
                </Td>
                <Td>7</Td>
                <Td>3</Td>
                <Td>
                  <Switch size='lg' />
                </Td>
                <Td>
                  <Image height='100px' width='100px' />
                </Td>
              </Tr>
              <Tr>
                <Td>Jan 2, 2022</Td>
                <Td>
                  <Stack spacing={2}>
                    <Text>Ad name</Text>
                    <Code
                      textAlign={"center"}
                      bg={"green.100"}
                      color={"green.500"}
                      borderRadius={"full"}
                      variant='solid'
                      fontWeight={"medium"}
                      fontSize={"xs"}
                    >
                      ACTIVE
                    </Code>
                  </Stack>
                </Td>
                <Td>7</Td>
                <Td>3</Td>
                <Td>
                  <Switch size='lg' />
                </Td>
                <Td>
                  <Image height='100px' width='100px' />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Stack>
    </Box>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/a/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}

export default Dashboard;
