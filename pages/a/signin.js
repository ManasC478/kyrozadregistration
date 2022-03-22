import Image from "next/image";
import NavLink from "next/link";
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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useUser } from "../../lib/CustomHooks/useUser";

import KyrozLogo from "../../assets/kyroz-logo.png";

// validates form inputs before signing in the user
const validate = (values) => {
  const { email, password } = values;
  const errors = {};

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

  return errors;
};

const SignIn = () => {
  const router = useRouter();
  const { logIn } = useUser();
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

        const status = await logIn({
          email: values.email,
          password: values.password,
        });
        router.replace("/dashboard");
      } catch (error) {
        console.log("pages/a/signin: ", error.message);

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
      email: "",
      password: "",
    },
    onSubmit,
  });
  return (
    <Box py={100}>
      <Box bg={"white"} maxW={400} mx={"auto"} boxShadow={"lg"}>
        <VStack spacing={1} px={5} py={10}>
          <Center>
            <Image src={KyrozLogo} alt='Kyroz' />
          </Center>
          <VStack spacing={2}>
            <Center p={0}>
              <Text fontWeight={"extrabold"} fontSize={"xl"} color={"#505e6c"}>
                Login.
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
              <Text>Don't have an account? </Text>
              <NavLink href='/a/signup' passHref>
                <Text as='u' ml={1}>
                  Create one.
                </Text>
              </NavLink>
            </Center>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default SignIn;
