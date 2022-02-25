import { Box, Text, Button } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useAdCreate } from "../../../lib/CustomHooks/AdCreate";

const AdMedia = () => {
  const { setMedia } = useAdCreate();
  const imageRef = useRef(null);

  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setMedia(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  return (
    <Box>
      <Text fontWeight={"semibold"} fontSize={"md"}>
        Media
      </Text>
      <form onChange={handleOnChange}>
        <input
          ref={imageRef}
          type='file'
          accept='image/*'
          style={{ display: "none" }}
        />
        <Button onClick={() => imageRef.current.click()}>Upload Image</Button>
      </form>
    </Box>
  );
};

export default AdMedia;
