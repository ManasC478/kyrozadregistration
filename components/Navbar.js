import {
  Box,
  HStack,
  Flex,
  Text,
  Link,
  Button,
  Avatar,
  IconButton,
  InputGroup,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
} from "@chakra-ui/react";
import { useUser } from "../lib/CustomHooks/useUser";

// import icons
import {
  MenuIcon,
  HomeIcon,
  DashboardIcon,
  LogoutIcon,
  SettingsIcon,
} from "../styles/icons";

import UserAvatar from "./UserAvatar";

import NavLink from "next/link";
import { useSession, signOut } from "next-auth/react";

import DefaultAvatar from "../assets/default-avatar.png";

import styles from "../styles/navbar.module.css";

const Navbar = () => {
  // const { data: session, status } = useSession();
  const { signOutUser, session, user } = useUser();

  return (
    // navbar box
    <Box borderBottom={"1px solid rgba(0,0,0,0.05)"}>
      <Flex
        as={"nav"}
        maxWidth={1200}
        mx={"auto"}
        overflow='hidden'
        minWidth={300}
        py={"10px"}
        px={"5px"}
        justifyContent='space-between'
      >
        <HStack spacing={"10px"} alignItems='center'>
          <IconButton
            bg={"none"}
            aria-label='icon'
            icon={<MenuIcon />}
            size='md'
            isRound
            fontSize={"2xl"}
          />
          <Text fontWeight='bold' fontSize='lg'>
            Kyroz
          </Text>
        </HStack>
        {/* <InputGroup w={"200px"}>
          <MenuIcon boxSize={5} />
          <Input />
        </InputGroup> */}

        {session ? (
          <HStack spacing={5} alignItems='center' justifyContent='center'>
            <NavLink href='/'>
              <IconButton
                bg={"none"}
                aria-label='icon'
                icon={<HomeIcon />}
                size='md'
                isRound
                fontSize={"2xl"}
              />
            </NavLink>
            <NavLink href='/dashboard'>
              <IconButton
                bg={"none"}
                aria-label='icon'
                icon={<DashboardIcon />}
                size='md'
                isRound
                fontSize={"2xl"}
              />
            </NavLink>
            <Menu>
              <MenuButton as={"button"} rounded={"full"} aria-label='Options'>
                <UserAvatar
                  src={user?.image}
                  bg={user?.imageBg}
                  name={user?.name}
                />
              </MenuButton>
              <MenuList minW='0' w={150} p={1}>
                <Center>
                  <NavLink href='/u/update' passHref>
                    <MenuItem
                      as={"a"}
                      icon={<SettingsIcon fontSize={"md"} />}
                      borderRadius={"md"}
                      _hover={{ color: "black", bg: "gray.200" }}
                    >
                      Settings
                    </MenuItem>
                  </NavLink>
                </Center>
                <Center>
                  <MenuItem
                    icon={<LogoutIcon fontSize={"md"} />}
                    borderRadius={"md"}
                    _hover={{ color: "black", bg: "gray.200" }}
                    onClick={signOutUser}
                  >
                    Logout
                  </MenuItem>
                </Center>
              </MenuList>
            </Menu>
          </HStack>
        ) : (
          <HStack spacing={10}>
            <NavLink href='/a/signup' passHref>
              <Button
                as={"a"}
                py={3}
                px={5}
                bg={"none"}
                borderRadius={"full"}
                _hover={{
                  color: "black",
                }}
              >
                Sign Up
              </Button>
            </NavLink>
            <NavLink href='/a/signin' passHref>
              <Button
                as={"a"}
                py={3}
                px={5}
                bg={"#dc3546"}
                color={"white"}
                borderRadius={"full"}
                outline={"none"}
                _hover={{
                  bg: "red.500",
                  color: "white",
                }}
              >
                Sign In
              </Button>
            </NavLink>
          </HStack>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
