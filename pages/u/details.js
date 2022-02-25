import Link from "next/link";
import {
  Box,
  Avatar,
  Grid,
  GridItem,
  Select,
  FormControl,
  Input,
  FormHelperText,
  FormErrorMessage,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useUser } from "../../lib/CustomHooks/useUser";

import { SelectDownIcon } from "../../styles/icons";
import PhoneNumberInput from "../../components/PhoneNumberInput";
import UserAvatar from "../../components/UserAvatar";

const validate = (values) => {
  const { name, number, url, category } = values;
  const errors = {};

  // business name input validations
  if (!name) {
    errors.name = "Required";
  } else if (name.length > 25) {
    errors.name = "Max length is 25 characters";
  }

  // category validation
  if (!category) {
    errors.category = "Required";
  }

  return errors;
};

const BusinessUpdate = () => {
  const router = useRouter();
  const { user, updateUser, session, status } = useUser();

  const [errors, setErrors] = useState({});

  const onSubmit = async (values) => {
    const error = validate(values);

    if (Object.keys(error).length > 0) {
      setErrors(error);
    } else {
      setErrors({});
      try {
        await updateUser(values);
        router.replace("/dashboard");
      } catch (error) {
        console.log(error.message);
        setErrors({ email: error.message, password: "" });
      }
    }

    formik.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      whereHeard: "",
      name: user?.name || "",
      number: user?.number || "",
      phoneCode: user?.phoneCode || "",
      url: user?.url || "",
      category: user?.category || "",
      image: user?.image || "",
    },
    onSubmit,
  });

  useEffect(() => {
    if (user && status === "authenticated") {
      const u = {
        name: user?.name || "",
        number: user?.number || "",
        phoneCode: user?.phoneCode || "+1",
        url: user?.url || "",
        category: user?.category || "",
        image: user?.image || "",
        imageBg: user?.imageColor || "",
      };

      // formik.setValues(u);
    }
  }, [user]);

  return (
    <Box py={100}>
      <form onSubmit={formik.handleSubmit}>
        <VStack
          spacing={2}
          maxWidth={900}
          ml='auto'
          mr='auto'
          justifyContent='center'
          alignItems='center'
        >
          <UserAvatar
            width={200}
            height={200}
            // name={formik.values.image}
            src={formik.values.image}
            bg={user?.imageBg}
          />
          <Grid templateColumns='repeat(2, 1fr)' gap={12}>
            {/* where you heard of Kyroz */}
            <GridItem colSpan={2}>
              <FormControl>
                <Select
                  icon={<SelectDownIcon />}
                  variant='flushed'
                  placeholder='How did you hear about us?'
                  size='md'
                  name='whereHeard'
                  onChange={formik.handleChange}
                  value={formik.values.whereHeard}
                >
                  <option value='friends and family'>Friends and family</option>
                  <option value='social media'>
                    Social media (Twitter, Facebook, etc.)
                  </option>
                  <option value='tv'>TV</option>
                  <option value='internet'>Internet</option>
                  <option value='article'>Article</option>
                </Select>
              </FormControl>
            </GridItem>
            {/* business name */}
            <GridItem>
              <FormControl isInvalid={errors.name}>
                <Input
                  variant='flushed'
                  placeholder='Business Name'
                  name='name'
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />

                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
            </GridItem>
            {/* email */}
            <GridItem>
              <FormControl>
                <Input
                  variant='flushed'
                  placeholder='Email'
                  value={session?.user?.email}
                  disabled
                />
              </FormControl>
            </GridItem>
            {/* phone number */}
            <GridItem>
              <FormControl>
                <PhoneNumberInput formik={formik} handleChange={() => {}} />
              </FormControl>
            </GridItem>
            {/* website link */}
            <GridItem colSpan={2}>
              <FormControl isInvalid={errors.url}>
                <Input
                  variant='flushed'
                  placeholder='Website Link'
                  name='url'
                  onChange={formik.handleChange}
                  value={formik.values.url}
                />

                <FormErrorMessage>{errors.url}</FormErrorMessage>
              </FormControl>
            </GridItem>
            {/* business category */}
            <GridItem colSpan={2}>
              <FormControl isInvalid={errors.category}>
                <Select
                  icon={<SelectDownIcon />}
                  name='category'
                  onChange={formik.handleChange}
                  value={formik.values.category}
                  variant='flushed'
                  placeholder='Category'
                  size='md'
                >
                  <option value='clothing and accessories'>
                    Clothing and accessories
                  </option>
                  <option value='books'>Books</option>
                  <option value='movies, music, games'>
                    Movies, Music, and Games
                  </option>
                  <option value='technology'>Technology</option>
                  <option value='home, garden, tools'>
                    Home, Garden, and Tools
                  </option>
                  <option value='pet supplies'>Pet Supplies</option>
                  <option value='food and grocery'>Food and Grocery</option>
                  <option value='beauty and health'>Beauty and Health</option>
                  <option value='toys, kids, baby'>Toys, Kids, and Baby</option>
                  <option value='handmade'>Handmade</option>
                  <option value='sports'>Sports</option>
                  <option value='outdoors'>Outdoors</option>
                  <option value='industrial and scientific'>
                    Industrial and Scientific
                  </option>
                </Select>
                <FormErrorMessage>{errors.category}</FormErrorMessage>
              </FormControl>
            </GridItem>
          </Grid>

          <HStack spacing={2} isInline>
            <Button size='md' type='submit' isLoading={formik.isSubmitting}>
              Update
            </Button>
            <Link href='/dashboard'>
              <Button size='md'>Skip</Button>
            </Link>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default BusinessUpdate;
