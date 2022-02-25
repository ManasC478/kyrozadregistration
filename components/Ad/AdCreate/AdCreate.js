import { Stack } from "@chakra-ui/react";

// imports
import AdFormat from "./AdFormat";
import AdMedia from "./AdMedia";
import AdText from "./AdText";
import AdCallToAction from "./AdCallToAction";

const AdCreate = () => {
  return (
    <Stack spacing={4}>
      <AdFormat />
      <AdMedia />
      <AdText />
      <AdCallToAction />
    </Stack>
  );
};

export default AdCreate;
