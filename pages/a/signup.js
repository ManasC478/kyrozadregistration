import NavLink from "next/link";
import { useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  FormControl,
  Input,
  FormErrorMessage,
  FormHelperText,
  VStack,
  Button,
  Text,
  Center,
  Grid,
  Checkbox,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import { useUser } from "../../lib/CustomHooks/useUser";

import styles from "../../styles/signup.module.css";
import SignupImage from "../../assets/signup/signup.jpg";

// validates form inputs before signing in the user
const validate = (values) => {
  const { name, email, password, passwordRepeat, terms } = values;
  const errors = {};

  // business name input validations
  if (!name) {
    errors.name = "Required";
  } else if (name.length > 25) {
    errors.name = "Max length is 25 characters";
  }

  // email input validations
  if (!email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "Invalid email.";
  }

  // password input validations
  if (!password) {
    errors.password = "Required";
  } else if (password.length < 8) {
    errors.password = "Password must be atleast 8 characters long";
  }

  // password repeat validations
  if (!passwordRepeat) {
    errors.passwordRepeat = "Required";
  } else if (passwordRepeat !== password) {
    errors.passwordRepeat = "The passwords don't match";
  }

  if (!terms) {
    errors.terms = "You must agree to the terms";
  }

  return errors;
};

const SignIn = ({ providers }) => {
  const router = useRouter();
  const { signUp } = useUser();
  const [errors, setErrors] = useState({});
  const [errorAlert, setErrorAlert] = useState({});

  // signs in the user
  const onSubmit = async (values) => {
    const error = validate(values);

    if (Object.keys(error).length > 0) {
      setErrors(error);
    } else {
      try {
        setErrors({});
        setErrorAlert({});

        const status = await signUp({
          name: values.name,
          email: values.email,
          password: values.password,
        });
        router.replace("/u/details");
      } catch (error) {
        console.log("pages/a/signup: ", error.message);

        // if error is 5xx then redirect to 500 server error page
        if (error.status >= 500) {
          router.push(`/500?message=${error.message}`);
        } else if (error.status >= 400) {
          setErrorAlert({ display: true, description: error.message });
        } else {
          router.push(`/500?message=${error.message}`);
        }
      }
    }

    formik.setSubmitting(false);
  };

  // const handleGoogleSignup = async () => {
  //   try {
  //     // login user with google
  //     const status = await signIn("google");
  //     router.push("/u/update");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      terms: false,
    },
    onSubmit,
  });
  return (
    <Box py={100}>
      <Grid
        bg={"white"}
        templateColumns={"500px 1fr"}
        maxW={900}
        mx={"auto"}
        boxShadow={"lg"}
      >
        <div className={styles.image_holder}></div>
        {/* <Image src={SignupImage} alt='Idea Building' /> */}
        <VStack spacing={2} px={5} py={10}>
          <Center p={0}>
            <Text fontWeight={"extrabold"} fontSize={"xl"} color={"#505e6c"}>
              Create an account.
            </Text>
          </Center>
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={7}>
              <VStack spacing={3} align={"left"}>
                <Alert
                  borderRadius={"md"}
                  status='error'
                  d={errorAlert.display ? "flex" : "none"}
                >
                  <AlertIcon />
                  {errorAlert.description}
                </Alert>
                <FormControl isInvalid={errors.name}>
                  <Input
                    bg={"gray.50"}
                    px={2}
                    placeholder='Business Name'
                    name='name'
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    variant='filled'
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.email}>
                  <Input
                    bg={"gray.50"}
                    px={2}
                    variant='filled'
                    name='email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder='Email'
                  />
                  <FormHelperText>
                    We'll never share your email with anyone else.
                  </FormHelperText>
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password}>
                  <Input
                    bg={"gray.50"}
                    px={2}
                    name='password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    variant='filled'
                    placeholder='Password'
                    type='password'
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.passwordRepeat}>
                  <Input
                    bg={"gray.50"}
                    px={2}
                    name='passwordRepeat'
                    onChange={formik.handleChange}
                    value={formik.values.passwordRepeat}
                    variant='filled'
                    placeholder='Repeat Password'
                    type='password'
                  />
                  <FormErrorMessage>{errors.passwordRepeat}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.terms}>
                  <Checkbox
                    checked={formik.values.terms}
                    name='terms'
                    onChange={formik.handleChange}
                  >
                    I agree to the license terms.
                  </Checkbox>
                  <FormErrorMessage>{errors.terms}</FormErrorMessage>
                </FormControl>
              </VStack>
              <Box w={"full"}>
                <Button
                  variant='solid'
                  bg={"#dc3545"}
                  color={"white"}
                  size='md'
                  w={"full"}
                  isLoading={formik.isSubmitting}
                  type='submit'
                  _hover={{ bg: "red.400" }}
                >
                  Sign Up
                </Button>
                {/* <Button
                  colorScheme={"white"}
                  color={"black"}
                  border={"1px solid"}
                  borderColor={"gray.200"}
                  variant='solid'
                  size='md'
                  mt={3}
                  w={"full"}
                  leftIcon={<FcGoogle />}
                  // onClick={() => signIn("google")}
                  onClick={handleGoogleSignup}
                >
                  Continue with Google
                </Button> */}
              </Box>
            </VStack>
          </form>
          <Center>
            <Text>Already have an account? </Text>
            <NavLink href='/a/signin' passHref>
              <Text as='u' ml={1}>
                Login.
              </Text>
            </NavLink>
          </Center>
        </VStack>
      </Grid>
    </Box>
  );
};

export default SignIn;
