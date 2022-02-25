import { Box, Text, RadioGroup, Stack, Radio } from "@chakra-ui/react";
import { useAdCreate } from "../../../lib/CustomHooks/AdCreate";

const AdFormat = () => {
  const { setFormat } = useAdCreate();

  return (
    <Box>
      <Text fontWeight={"semibold"} fontSize={"md"}>
        Format
      </Text>
      <RadioGroup>
        <Stack spacing={2}>
          <Radio
            value='banner'
            onChange={(e) => {
              setFormat(e.currentTarget.value);
            }}
          >
            Banner
          </Radio>
          <Radio
            value='deal'
            onChange={(e) => {
              setFormat(e.currentTarget.value);
            }}
          >
            Deal
          </Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
};

export default AdFormat;
