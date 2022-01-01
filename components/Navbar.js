import {
  Box,
  HStack,
  Flex,
  Text,
  Link,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import NavLink from "next/link";
import { signIn } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  // console.log(session.user);

  return (
    // navbar box
    <Box id='navbar'>
      <Flex justify={"space-between"} align={"center"} px={10} py={5}>
        <Flex align={"center"}>
          <Text fontWeight={900} fontSize={"2xl"} mr={10}>
            Kyroz
          </Text>
          <HStack spacing={4}>
            <NavLink href='/#' passHref>
              <Link>Dashboard</Link>
            </NavLink>
          </HStack>
        </Flex>
        {!session ? (
          <HStack spacing={10}>
            <Button py={3} px={5} as={"a"} variant={"link"}>
              Sign Up
            </Button>
            c
            <NavLink href='/a/signin' passHref>
              <Button
                as={"a"}
                py={3}
                px={5}
                bg={"pink.400"}
                _hover={{ bg: "pink.300" }}
                color={"white"}
              >
                Sign In
              </Button>
            </NavLink>
          </HStack>
        ) : (
          <Menu>
            <MenuButton
              as={"button"}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
            >
              <Avatar size={"sm"} src={session.user.image} />
            </MenuButton>
            <MenuList>
              <MenuItem>Link 1</MenuItem>
              <MenuItem>Link 2</MenuItem>
              <MenuDivider />
              <MenuItem as={"button"} onClick={() => signOut()}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
