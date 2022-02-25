import {
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Radio,
  RadioGroup,
  Button,
} from "@chakra-ui/react";
import { SelectDownIcon, ImageIcon } from "../../../styles/icons";
import { useAdCreate } from "../../../lib/CustomHooks/AdCreate";

const AdCallToAction = () => {
  const { callToAction, setCallToAction } = useAdCreate();

  return (
    <Box>
      <Text fontWeight={"semibold"} fontSize={"md"}>
        Call to Action
      </Text>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<SelectDownIcon />}
          w={"full"}
          bg={"none"}
          border={"1px solid"}
          borderColor={"gray.200"}
          _hover={{ bg: "none" }}
          _active={{ bg: "none" }}
          _focus={{ outline: "none" }}
        >
          {callToAction}
        </MenuButton>
        <MenuList maxH={300} overflowY={"scroll"}>
          <RadioGroup defaultValue={callToAction}>
            <MenuItem>
              <Radio
                value='No Button'
                onChange={(e) => setCallToAction(e.currentTarget.value)}
              >
                No Button
              </Radio>
            </MenuItem>
            <MenuItem>
              <Radio
                value='Subsribe'
                onChange={(e) => setCallToAction(e.currentTarget.value)}
              >
                Subscribe
              </Radio>
            </MenuItem>
            <MenuItem>
              <Radio
                value='Watch more'
                onChange={(e) => setCallToAction(e.currentTarget.value)}
              >
                Watch more
              </Radio>
            </MenuItem>
            <MenuItem>
              <Radio
                value='Apply now'
                onChange={(e) => setCallToAction(e.currentTarget.value)}
              >
                Apply now
              </Radio>
            </MenuItem>
            <MenuItem>
              <Radio
                value='Book now'
                onChange={(e) => setCallToAction(e.currentTarget.value)}
              >
                Book now
              </Radio>
            </MenuItem>
            <MenuItem>
              <Radio
                value='Contact us'
                onChange={(e) => setCallToAction(e.currentTarget.value)}
              >
                Contact us
              </Radio>
            </MenuItem>
            <MenuItem>
              <Radio
                value='Donate now'
                onChange={(e) => setCallToAction(e.currentTarget.value)}
              >
                Donate now
              </Radio>
            </MenuItem>
            <MenuItem>
              <Radio
                value='Download'
                onChange={(e) => setCallToAction(e.currentTarget.value)}
              >
                Download
              </Radio>
            </MenuItem>
            <MenuItem>
              <Radio
                value='Get offer'
                onChange={(e) => setCallToAction(e.currentTarget.value)}
              >
                Get offer
              </Radio>
            </MenuItem>
            <MenuItem>
              <Radio
                value='Learn more'
                onChange={(e) => setCallToAction(e.currentTarget.value)}
              >
                Learn more
              </Radio>
            </MenuItem>
            <MenuItem>
              <Radio
                value='Listen now'
                onChange={(e) => setCallToAction(e.currentTarget.value)}
              >
                Listen now
              </Radio>
            </MenuItem>
            <MenuItem>
              <Radio
                value='Order now'
                onChange={(e) => setCallToAction(e.currentTarget.value)}
              >
                Order now
              </Radio>
            </MenuItem>
            <MenuItem>
              <Radio
                value='Play game'
                onChange={(e) => setCallToAction(e.currentTarget.value)}
              >
                Play game
              </Radio>
            </MenuItem>
            <MenuItem>
              <Radio
                value='See menu'
                onChange={(e) => setCallToAction(e.currentTarget.value)}
              >
                See menu
              </Radio>
            </MenuItem>
            <MenuItem>
              <Radio
                value='Shop now'
                onChange={(e) => setCallToAction(e.currentTarget.value)}
              >
                Shop now
              </Radio>
            </MenuItem>
            <MenuItem>
              <Radio
                value='Sign up'
                onChange={(e) => setCallToAction(e.currentTarget.value)}
              >
                Sign up
              </Radio>
            </MenuItem>
          </RadioGroup>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default AdCallToAction;
