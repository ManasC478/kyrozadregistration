import { useState } from "react";
import { Box, Flex, Input, Select, InputGroup } from "@chakra-ui/react";
import ReactCountryFlag from "react-country-flag";
import { countries } from "countries-list";

const filterCode = (i) => {
  return Object.keys(countries)[i];
};

export default function PhoneNumberInput({ formik }) {
  const [selectedCountry, setSelectedCountry] = useState("US");

  return (
    <InputGroup size={"md"}>
      <Flex align={"center"}>
        <Box pos={"relative"} w={"60px"} pr={5}>
          <Select
            variant='flushed'
            right='0'
            zIndex={1}
            bottom={0}
            opacity={0}
            height='100%'
            position='absolute'
            data-code={selectedCountry}
            name='phoneCode'
            value={formik.values.phoneCode}
            onChange={(e) => {
              setSelectedCountry(filterCode(e.target.selectedIndex));
              formik.handleChange(e);
            }}
          >
            {Object.keys(countries).map((country) => (
              <option
                key={country}
                name={country}
                data-code={country}
                value={countries[country].phone}
              >
                {countries[country].name}
              </option>
            ))}
          </Select>
          <ReactCountryFlag
            countryCode={selectedCountry}
            style={{ width: "50px", fontSize: "2rem" }}
          />
        </Box>
        <Input
          variant='flushed'
          w={"85px"}
          disabled
          value={`${formik.values.phoneCode}`}
        />
        <Input
          variant='flushed'
          type='number'
          placeholder='Number'
          name='number'
          onChange={formik.handleChange}
          value={formik.values.number}
        />
      </Flex>
    </InputGroup>
  );
}
