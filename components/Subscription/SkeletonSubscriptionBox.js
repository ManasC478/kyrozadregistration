import {
  WrapItem,
  Box,
  Stack,
  Flex,
  Divider,
  List,
  ListItem,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

const SkeletonSubscriptionBox = () => {
  return (
    <WrapItem>
      <Box w={64} borderRadius={"2xl"} boxShadow={"lg"} bg={"gray.100"} p={8}>
        <Stack spacing={4}>
          <Stack isInline spacing={7} align={"center"}>
            <Skeleton w={65} h={65} borderRadius={"xl"} />
            <Box py={2}>
              <SkeletonText />
              <SkeletonText />
            </Box>
          </Stack>
          <Divider color={"gray.300"} />
          <List spacing={1}>
            <ListItem>
              <SkeletonText />
            </ListItem>
            <ListItem>
              <SkeletonText />
            </ListItem>
            <ListItem>
              <SkeletonText />
            </ListItem>
          </List>
          <Skeleton />
        </Stack>
      </Box>
    </WrapItem>
  );
};

export default SkeletonSubscriptionBox;
