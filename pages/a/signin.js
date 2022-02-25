import Image from "next/image";
import NavLink from "next/link";
import {
  Flex,
  Box,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  VStack,
  Link,
  Button,
  Text,
  Center,
  Grid,
  Checkbox,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useFormik } from "formik";
import {
  getSession,
  useSession,
  getProviders,
  getCsrfToken,
  signIn,
} from "next-auth/react";
import { useRouter } from "next/router";
import { useUser } from "../../lib/CustomHooks/useUser";

import KyrozLogo from "../../assets/signin/kyroz-logo.png";

import styles from "../../styles/signin.module.css";

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
  const { user, session, status, logIn } = useUser();
  const [errors, setErrors] = useState({});
  const [errorAlert, setErrorAlert] = useState({});

  const onSubmit = async (values) => {
    const error = validate(values);

    if (Object.keys(error).length > 0) {
      setErrors(error);
    } else {
      try {
        setErrors({});
        setErrorAlert({});
        // validate the login with database
        // const res = await fetch("/api/a/loginUser", {
        //   method: "POST",
        //   headers: new Headers({ "Content-Type": "application/json" }),
        //   body: JSON.stringify(values),
        // });
        // const user = (await res.json()).user;

        // // if 4xx code in response throw errors
        // switch (res.status) {
        //   case 401:
        //     throw new Error("Email not found");
        //   case 403:
        //     throw new Error("Incorrect password");
        // }

        // login user
        // await signIn("credentials", {
        //   redirect: false,
        //   id: user._id,
        //   email: user.email,
        //   businessName: user.businessName,
        // });

        const status = await logIn({
          email: values.email,
          password: values.password,
        });
        console.log(status);
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
  //     console.log(status);
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

// export async function getServerSideProps(context) {
//   let providers, csrfToken;
//   const session = await getSession(context);
//   if (session) {
//     return {
//       redirect: { destination: "/dashboard", permanent: false },
//     };
//   }
//   providers = Object.values(await getProviders()).filter(
//     (provider) => provider.id !== "credentials"
//   );
//   csrfToken = await getCsrfToken(context);
//   return {
//     props: {
//       providers,
//       csrfToken: csrfToken || null,
//     },
//   };
// }

export default SignIn;
