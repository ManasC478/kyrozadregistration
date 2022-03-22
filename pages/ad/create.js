import { useState, useRef } from "react";
import { getSession } from "next-auth/react";
import { CreateAdProvider } from "../../lib/CustomHooks/AdCreate";

import {
  Box,
  Grid,
  Stack,
  Text,
  RadioGroup,
  Radio,
  Checkbox,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SelectDownIcon, ImageIcon } from "../../styles/icons";

import BannerPreview from "../../components/BannerPreview";

// component imports
import AdName from "../../components/Ad/AdName";
import AdCreate from "../../components/Ad/AdCreate/AdCreate";

const CreateAd = () => {
  const [value, setValue] = useState(new Date());
  const [imageSrc, setImageSrc] = useState(null);
  const imageRef = useRef(null);

  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  return (
    <Box maxW={1200} mx={"auto"}>
      <Grid templateColumns='5fr 4fr' gap={10}>
        <CreateAdProvider>
          <Stack
            align={"flex-end"}
            overflowY={"scroll"}
            sx={{
              "&::-webkit-scrollbar": {
                width: "0",
              },
            }}
          >
            {/* ad inputs */}
            <Stack spacing={5} maxW={400} w={400} py={5}>
              {/* name */}
              <AdName />
              {/* create ad */}
              <Box p={5} bg={"white"} boxShadow={"md"} borderRadius={"xl"}>
                <Text as={"h2"} fontWeight={"bold"} fontSize={"lg"} mb={5}>
                  Create Your Ad
                </Text>
                <AdCreate />
              </Box>
              {/* schedule */}
              <Box p={5} bg={"white"} boxShadow={"md"} borderRadius={"xl"}>
                <Text as={"h2"} fontWeight={"bold"} fontSize={"lg"} mb={5}>
                  Schedule
                </Text>
                <Stack spacing={2}>
                  <Box>
                    <Text fontWeight={"semibold"} fontSize={"md"}>
                      Start Time
                    </Text>
                    <DatePicker
                      selected={value}
                      onChange={(date) => setValue(date)}
                      showTimeSelect
                      dateFormat='Pp'
                    />
                  </Box>
                  <Box>
                    <Text fontWeight={"semibold"} fontSize={"md"}>
                      End Date (Optional)
                    </Text>
                    <Checkbox mb={3}>Choose to set end date</Checkbox>
                    <Box>
                      <DatePicker
                        selected={value}
                        onChange={(date) => setValue(date)}
                        showTimeSelect
                        dateFormat='Pp'
                      />
                    </Box>
                  </Box>
                </Stack>
              </Box>
              {/* audience */}
              <Box p={5} bg={"white"} boxShadow={"md"} borderRadius={"xl"}>
                <Text as={"h2"} fontWeight={"bold"} fontSize={"lg"} mb={5}>
                  Audience
                </Text>
                <Stack spacing={2}>
                  <Box>
                    <Text fontWeight={"semibold"} fontSize={"md"}>
                      Location
                    </Text>
                    <List>
                      <ListItem>list</ListItem>
                    </List>
                  </Box>
                  <Box>
                    <Text fontWeight={"semibold"} fontSize={"md"}>
                      Age
                    </Text>
                    <Stack isInline spacing={3} align={"center"}>
                      {/* starting age */}
                      <Menu>
                        <MenuButton
                          as={Button}
                          rightIcon={<SelectDownIcon />}
                          bg={"none"}
                          border={"1px solid"}
                          borderColor={"gray.200"}
                          _hover={{ bg: "none" }}
                          _active={{ bg: "none" }}
                          _focus={{ outline: "none" }}
                        >
                          Actions
                        </MenuButton>
                        <Text>To</Text>
                        <MenuList maxH={300} overflowX={"scroll"}>
                          <MenuItem>
                            <Radio>13</Radio>
                          </MenuItem>
                          <MenuItem>
                            <Radio>14</Radio>
                          </MenuItem>
                          <MenuItem>
                            <Radio>15</Radio>
                          </MenuItem>
                          <MenuItem>
                            <Radio>16</Radio>
                          </MenuItem>
                          <MenuItem>
                            <Radio>17</Radio>
                          </MenuItem>
                          <MenuItem>
                            <Radio>18</Radio>
                          </MenuItem>
                        </MenuList>
                      </Menu>

                      {/* ending age */}
                      <Menu>
                        <MenuButton
                          as={Button}
                          rightIcon={<SelectDownIcon />}
                          bg={"none"}
                          border={"1px solid"}
                          borderColor={"gray.200"}
                          _hover={{ bg: "none" }}
                          _active={{ bg: "none" }}
                          _focus={{ outline: "none" }}
                        >
                          Actions
                        </MenuButton>
                        <MenuList maxH={300} overflowX={"scroll"}>
                          <MenuItem>
                            <Radio>13</Radio>
                          </MenuItem>
                          <MenuItem>
                            <Radio>14</Radio>
                          </MenuItem>
                          <MenuItem>
                            <Radio>15</Radio>
                          </MenuItem>
                          <MenuItem>
                            <Radio>16</Radio>
                          </MenuItem>
                          <MenuItem>
                            <Radio>17</Radio>
                          </MenuItem>
                          <MenuItem>
                            <Radio>18</Radio>
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Stack>
                  </Box>
                  <Box>
                    <Text fontWeight={"semibold"} fontSize={"md"}>
                      Genders
                    </Text>
                    <RadioGroup>
                      <Stack isInline spacing={5}>
                        <Radio>All</Radio>
                        <Radio>Men</Radio>
                        <Radio>Women</Radio>
                      </Stack>
                    </RadioGroup>
                  </Box>
                </Stack>
              </Box>
              <Button
                variant='solid'
                bg={"black"}
                color={"white"}
                size='md'
                py={4}
                borderRadius={"xl"}
                _hover={{ bg: "gray.700" }}
              >
                Save
              </Button>
            </Stack>
          </Stack>
          {/* ad preview */}
          <Stack
            align={"flex-start"}
            spacing={2}
            maxW={400}
            h={"full"}
            py={100}
            pos={"relative"}
          >
            <BannerPreview imageSrc={imageSrc} />
          </Stack>
        </CreateAdProvider>
      </Grid>
    </Box>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/a/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}

export default CreateAd;
