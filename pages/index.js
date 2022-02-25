import Head from "next/head";
import NextImage from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsHelping,
  faPaperPlane,
  faNewspaper,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import HomeBg from "../assets/home-bg.jpg";
import Img1 from "../assets/1.jpg";
import Img2 from "../assets/2.jpg";
import Img3 from "../assets/3.jpg";
import Img4 from "../assets/4.jpg";
import Img5 from "../assets/5.jpg";
import Img6 from "../assets/6.jpg";
import GooglePlayBadge from "../assets/google-play-badge.png";
import AppStoreBadge from "../assets/app-store-badge.png";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session);

  return (
    <Box>
      <Flex
        align={"center"}
        justify={"center"}
        pos={"relative"}
        w={"full"}
        height={"75vh"}
      >
        <NextImage
          src={HomeBg}
          alt='Singer Singing'
          layout='fill'
          objectFit='cover'
        />
        <VStack spacing={"40px"} color={"white"} zIndex={1}>
          <Heading as={"h1"}>KYROZ FOR ADVERTISERS</Heading>
          {/* <Divider
          color={"dc3546"}
          // orientation={"horizontal"}
          size={"10px"}
          height={"10px"}
        /> */}
          <Box w={"50px"} h={"5px"} bg={"#dc3546"} borderRadius={"full"}></Box>
          <Text as={"p"} fontSize={"lg"}>
            The Place to advertise your adverstisements for atmost.
          </Text>
          <Button
            bg={""}
            py={"30px"}
            px={"50px"}
            bg={"#dc3546"}
            fontWeight={"extrabold"}
            borderRadius={"full"}
            boxShadow={"lg"}
            fontSize={"lg"}
          >
            FIND OUT MORE
          </Button>
        </VStack>
      </Flex>
      <Box bg={"#dc3546"} py={"115px"} px={"50px"}>
        <VStack spacing={"25px"} color={"white"}>
          <Heading as={"h2"} fontWeight={"normal"}>
            We've got what you need!
          </Heading>
          <Box w={"50px"} h={"5px"} bg={"white"} borderRadius={"full"}></Box>
          <Text color={"rgba(255,255,255,.7)"}>
            Kyroz has everything that you need we are the social plaform to help
            the people to collaborate and work together.
          </Text>
          <Text color={"rgba(255,255,255,.7)"}>
            We are Happy to announce you that we are providing advertisements
            for the advertisers
          </Text>
          <Button
            bg={""}
            py={"30px"}
            px={"50px"}
            bg={"white"}
            fontWeight={"extrabold"}
            borderRadius={"full"}
            boxShadow={"lg"}
            fontSize={"lg"}
            color={"black"}
          >
            GET STARTED!
          </Button>
        </VStack>
      </Box>
      <Box py={"115px"} px={"50px"} zIndex={3}>
        <VStack spacing={"25px"}>
          <Heading as={"h2"} fontWeight={"normal"}>
            At Your Service
          </Heading>
          <Box w={"50px"} h={"5px"} bg={"#dc3546"} borderRadius={"full"}></Box>
          <SimpleGrid columns={4} spacing={10} textAlign={"center"}>
            <VStack spacing={"10px"}>
              <FontAwesomeIcon
                icon={faHandsHelping}
                size='6x'
                color='#dc3546'
              />
              <Text as={"h3"} fontSize={"3xl"}>
                Collaborate
              </Text>
              <Text as={"p"} color={"#868e96"}>
                The place to collaborate.
              </Text>
            </VStack>
            <VStack spacing={"10px"}>
              <FontAwesomeIcon icon={faPaperPlane} size='6x' color='#dc3546' />
              <Text as={"h3"} fontSize={"3xl"}>
                Advertise
              </Text>
              <Text as={"p"} color={"#868e96"}>
                You can advertise.
              </Text>
            </VStack>
            <VStack spacing={"10px"}>
              <FontAwesomeIcon icon={faNewspaper} size='6x' color='#dc3546' />
              <Text as={"h3"} fontSize={"3xl"}>
                Up to Date
              </Text>
              <Text as={"p"} color={"#868e96"}>
                Be the Tech start person in the world.
              </Text>
            </VStack>
            <VStack spacing={"10px"}>
              <FontAwesomeIcon icon={faHeart} size='6x' color='#dc3546' />
              <Text as={"h3"} fontSize={"3xl"}>
                Made with Love
              </Text>
              <Text as={"p"} color={"#868e96"}>
                Being helpful and doing things fruitful.
              </Text>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Box>
      <SimpleGrid columns={3}>
        <Flex pos={"relative"} w={"full"}>
          <NextImage src={Img1} alt='Project 1' objectFit='cover' />
          <VStack
            pos={"absolute"}
            bg={"rgba(220, 53, 70, 0.9)"}
            w={"full"}
            h={"full"}
            align={"center"}
            justify={"center"}
            opacity={0}
            transition={"0.2s"}
            _hover={{ opacity: 1 }}
          >
            <Text
              as={"h3"}
              textTransform={"uppercase"}
              fontWeight={"bold"}
              fontSize={"lg"}
              color={"rgba(255,255,255,.7)"}
            >
              Category
            </Text>
            <Text
              as={"p"}
              fontWeight={"normal"}
              fontSize={"2xl"}
              color={"white"}
            >
              Project Name
            </Text>
          </VStack>
        </Flex>
        <Flex pos={"relative"} w={"full"}>
          <NextImage src={Img2} alt='Project 2' objectFit='cover' />
          <VStack
            pos={"absolute"}
            bg={"rgba(220, 53, 70, 0.9)"}
            w={"full"}
            h={"full"}
            align={"center"}
            justify={"center"}
            opacity={0}
            transition={"0.2s"}
            _hover={{ opacity: 1 }}
          >
            <Text
              as={"h3"}
              textTransform={"uppercase"}
              fontWeight={"bold"}
              fontSize={"lg"}
              color={"rgba(255,255,255,.7)"}
            >
              Category
            </Text>
            <Text
              as={"p"}
              fontWeight={"normal"}
              fontSize={"2xl"}
              color={"white"}
            >
              Project Name
            </Text>
          </VStack>
        </Flex>
        <Flex pos={"relative"} w={"full"}>
          <NextImage src={Img3} alt='Project 3' objectFit='cover' />
          <VStack
            pos={"absolute"}
            bg={"rgba(220, 53, 70, 0.9)"}
            w={"full"}
            h={"full"}
            align={"center"}
            justify={"center"}
            opacity={0}
            transition={"0.2s"}
            _hover={{ opacity: 1 }}
          >
            <Text
              as={"h3"}
              textTransform={"uppercase"}
              fontWeight={"bold"}
              fontSize={"lg"}
              color={"rgba(255,255,255,.7)"}
            >
              Category
            </Text>
            <Text
              as={"p"}
              fontWeight={"normal"}
              fontSize={"2xl"}
              color={"white"}
            >
              Project Name
            </Text>
          </VStack>
        </Flex>
        <Flex pos={"relative"} w={"full"}>
          <NextImage src={Img4} alt='Project 4' objectFit='cover' />
          <VStack
            pos={"absolute"}
            bg={"rgba(220, 53, 70, 0.9)"}
            w={"full"}
            h={"full"}
            align={"center"}
            justify={"center"}
            opacity={0}
            transition={"0.2s"}
            _hover={{ opacity: 1 }}
          >
            <Text
              as={"h3"}
              textTransform={"uppercase"}
              fontWeight={"bold"}
              fontSize={"lg"}
              color={"rgba(255,255,255,.7)"}
            >
              Category
            </Text>
            <Text
              as={"p"}
              fontWeight={"normal"}
              fontSize={"2xl"}
              color={"white"}
            >
              Project Name
            </Text>
          </VStack>
        </Flex>
        <Flex pos={"relative"} w={"full"}>
          <NextImage src={Img5} alt='Project 5' objectFit='cover' />
          <VStack
            pos={"absolute"}
            bg={"rgba(220, 53, 70, 0.9)"}
            w={"full"}
            h={"full"}
            align={"center"}
            justify={"center"}
            opacity={0}
            transition={"0.2s"}
            _hover={{ opacity: 1 }}
          >
            <Text
              as={"h3"}
              textTransform={"uppercase"}
              fontWeight={"bold"}
              fontSize={"lg"}
              color={"rgba(255,255,255,.7)"}
            >
              Category
            </Text>
            <Text
              as={"p"}
              fontWeight={"normal"}
              fontSize={"2xl"}
              color={"white"}
            >
              Project Name
            </Text>
          </VStack>
        </Flex>
        <Flex pos={"relative"} w={"full"}>
          <NextImage src={Img6} alt='Project 6' objectFit='cover' />
          <VStack
            pos={"absolute"}
            bg={"rgba(220, 53, 70, 0.9)"}
            w={"full"}
            h={"full"}
            align={"center"}
            justify={"center"}
            opacity={0}
            transition={"0.2s"}
            _hover={{ opacity: 1 }}
          >
            <Text
              as={"h3"}
              textTransform={"uppercase"}
              fontWeight={"bold"}
              fontSize={"lg"}
              color={"rgba(255,255,255,.7)"}
            >
              Category
            </Text>
            <Text
              as={"p"}
              fontWeight={"normal"}
              fontSize={"2xl"}
              color={"white"}
            >
              Project Name
            </Text>
          </VStack>
        </Flex>
      </SimpleGrid>
      <Box
        py={"115px"}
        px={"50px"}
        // bgGradient={"linear(to-b, #2d23ef, #ef233b"}
        bgGradient={"linear(to-br, #90d5ec, #ef233b)"}
      >
        <Center>
          <VStack spacing={"20px"}>
            <Heading as={"h2"} fontWeight={"normal"}>
              Kyroz for Mobile
            </Heading>
            <HStack spacing={"5px"}>
              <Box w={"250px"}>
                <NextImage src={GooglePlayBadge} />
              </Box>
              <Box w={"250px"}>
                <NextImage src={AppStoreBadge} />
              </Box>
            </HStack>
          </VStack>
        </Center>
      </Box>
      {/* {session ? (
          <>
            Signed in as {session.user.email} <br />
            <img src={session.user.image} alt={session.user.name} />
            <br />
            <p>{session.user.name}</p>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )} */}
    </Box>
  );
}
