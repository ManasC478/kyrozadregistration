import {
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MapIcon, MailIcon, WebsiteIcon } from "../styles/icons";
import NextLink from "next/link";
import Image from "next/image";
import KyrozLogo from "../assets/kyroz-logo.png";
import { useUser } from "../lib/CustomHooks/useUser";

const Footer = () => {
  const { session } = useUser();
  return (
    <Box bg={"gray.600"}>
      <Grid
        templateColumns={"300px 300px 1fr"}
        gap={10}
        color={"white"}
        maxW={1200}
        mx={"auto"}
        p={10}
      >
        <GridItem w={"100%"}>
          <Text mb={3} fontSize={"lg"} fontWeight={"bold"}>
            Resources
          </Text>
          <Stack spacing={2} color={"gray.300"}>
            <Link href='https://kyroz.in/freelanceragreement.html' isExternal>
              Freelancer Agreement
            </Link>
            <Link
              href='https://kyroz.in/nondisclosureagreement.html'
              isExternal
            >
              Non-Disclosure Agreement
            </Link>
            <Link
              href='https://kyroz.in/softwaredevelopmentagreement.html'
              isExternal
            >
              Software Development Agreement
            </Link>
            <Link href='https://kyroz.in/disclaimerpolicy.html' isExternal>
              Disclaimer Policy
            </Link>
            <Link href='https://kyroz.in/about_us.html' isExternal>
              About us
            </Link>
          </Stack>
        </GridItem>
        <GridItem w={"100%"}>
          <Text mb={3} fontSize={"lg"} fontWeight={"bold"}>
            Location
          </Text>
          <Stack spacing={2} color={"gray.300"}>
            <Stack isInline spacing={2} align={"center"}>
              <Icon as={MapIcon} />
              <Text>Hyderabad, Telangana, India 502313.</Text>
            </Stack>
            <Stack isInline spacing={2} align={"center"}>
              <Icon as={MailIcon} />
              <Link href='mailto:contact@kyroz.in'>contact@kyroz.in</Link>
            </Stack>
            <Stack isInline spacing={2} align={"center"}>
              <Icon as={WebsiteIcon} />
              <Link href='https://kyroz.in' isExternal>
                www.kyroz.in
              </Link>
            </Stack>
          </Stack>
        </GridItem>
        <GridItem w={"100%"}>
          <Stack spacing={4}>
            <Image src={KyrozLogo} alt='Kyroz' layout='fixed' />
            <Text>
              kyroz.in is a Social Networking App for those who have Passion to
              design the Future.
            </Text>
            {session ? (
              <NextLink href='/dashboard' passHref>
                <Button
                  variant={"outline"}
                  _hover={{ bg: "gray.100", color: "gray.600" }}
                >
                  Dashboard
                </Button>
              </NextLink>
            ) : (
              <NextLink href='/a/signup' passHref>
                <Button bg={"#dc3545"} _hover={{ bg: "red.400" }}>
                  Sign Up
                </Button>
              </NextLink>
            )}
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Footer;
