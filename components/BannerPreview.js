import { Box, Switch, HStack, VStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import BannerPlaceholder from "../assets/BannerPlaceholder.png";

const BannerPreview = ({ imageSrc }) => {
  return (
    <VStack
      spacing={5}
      p={5}
      bg={"white"}
      boxShadow={"md"}
      borderRadius={"xl"}
      align={"flex-start"}
      pos={"sticky"}
      top={100}
    >
      <HStack spacing={2}>
        <Switch size='lg' />
        <Text as={"h2"} fontSize={"lg"} fontWeight={"bold"}>
          Ad Preview
        </Text>
      </HStack>
      <Box
        w={300}
        h={150}
        boxShadow={"md"}
        border={"1px solid"}
        borderColor={"gray.200"}
        borderRadius={"xl"}
        pos={"relative"}
        bg={"gray.100"}
        overflow={"hidden"}
      >
        <Image
          src={imageSrc || BannerPlaceholder}
          alt='Banner'
          layout='fill'
          objectFit='contain'
          priority
        />
      </Box>
    </VStack>
  );
};

export default BannerPreview;
