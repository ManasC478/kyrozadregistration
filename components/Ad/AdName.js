import {
  Box,
  Text,
  FormControl,
  Input,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useAdCreate } from "../../lib/CustomHooks/AdCreate";

const AdName = () => {
  const { name, setName } = useAdCreate();

  return (
    <Box p={5} bg={"white"} boxShadow={"md"} borderRadius={"xl"}>
      <Text as={"h2"} fontWeight={"bold"} fontSize={"lg"} mb={5}>
        Ad Name
      </Text>
      <FormControl>
        <Input
          placeholder={"Ad name..."}
          value={name}
          onChange={(e) => setName(e.target.value)}
          size={"md"}
          fontSize={"md"}
        />
        <FormHelperText>
          This name will be displayed only to you.
        </FormHelperText>
        <FormErrorMessage>Error message</FormErrorMessage>
      </FormControl>
    </Box>
  );
};

export default AdName;
