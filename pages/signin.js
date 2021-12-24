import { useFormik } from "formik";
import {
  Flex,
  Box,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  VStack,
  Button,
  Text,
  Center,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import {
  getSession,
  getProviders,
  getCsrfToken,
  signIn,
} from "next-auth/react";

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

const SignIn = ({ providers }) => {
  const onSubmit = (values) => {
    setTimeout(() => {
      formik.setSubmitting(false);
    }, 1000);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit,
  });
  return (
    <Flex justify={"center"} align={"center"}>
      <Box w={"lg"} rounded={"lg"} boxShadow={"lg"} p={8}>
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4}>
            <FormControl id='email' isInvalid={formik.errors.email} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                // type='email'
                name='email'
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <FormHelperText>We will never share your email.</FormHelperText>
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl
              id='password'
              isInvalid={formik.errors.password}
              isRequired
            >
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                name='password'
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
          </VStack>
          <Button
            mt={4}
            type='submit'
            w={"full"}
            bg={"blue.400"}
            color={"white"}
            _hover={{ bg: "blue.500" }}
            isLoading={formik.isSubmitting}
          >
            Sign In
          </Button>
        </form>
        <Center my={4}>
          <Text as={"h4"}>or</Text>
        </Center>
        {Object.values(providers).map((provider) => (
          <Button
            key={provider.name}
            w={"full"}
            variant={"outline"}
            leftIcon={<FcGoogle />}
            onClick={() => signIn(provider.id)}
          >
            <Center>
              <Text>Sign in with {provider.name}</Text>
            </Center>
          </Button>
        ))}
      </Box>
    </Flex>
  );
};

export default SignIn;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  //   if (session) {
  //     return {
  //       redirect: { destination: "/" },
  //     };
  //   }

  return {
    props: {
      providers,
      csrfToken,
    },
  };
}
