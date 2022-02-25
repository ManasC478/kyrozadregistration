import {
  Box,
  Text,
  FormControl,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { useAdCreate } from "../../../lib/CustomHooks/AdCreate";

const AdText = () => {
  const { headline, setHeadline, description, setDescription, link, setLink } =
    useAdCreate();

  return (
    <>
      <Box>
        <Text fontWeight={"semibold"} fontSize={"md"}>
          Headline
        </Text>
        <FormControl>
          <Input
            placeholder='Headline...'
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            size={"md"}
            fontSize={"md"}
          />
          <FormErrorMessage>Error message</FormErrorMessage>
        </FormControl>
      </Box>
      <Box>
        <Text fontWeight={"semibold"} fontSize={"md"}>
          Description
        </Text>
        <FormControl>
          <Textarea
            placeholder='Description...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size={"md"}
            fontSize={"md"}
          />
          <FormErrorMessage>Error message</FormErrorMessage>
        </FormControl>
      </Box>
      <Box>
        <Text fontWeight={"semibold"} fontSize={"md"}>
          Link
        </Text>
        <FormControl>
          <Input
            placeholder='Link...'
            value={link}
            onChange={(e) => setLink(e.target.value)}
            size={"md"}
            fontSize={"md"}
          />
          <FormErrorMessage>Error message</FormErrorMessage>
        </FormControl>
      </Box>
    </>
  );
};

export default AdText;
