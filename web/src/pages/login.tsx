import React, { useState } from "react";
import NextLink from "next/link";
import { Form, Formik } from "formik";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
} from "@chakra-ui/react";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { InputField } from "../components/InputField";
import { Lock, Person } from "@material-ui/icons";
import { pink } from "@material-ui/core/colors";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Formik
      initialValues={{ usernameOrEmail: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        console.log(
          `Submitted. With values: ${values.usernameOrEmail}, ${values.password}`
        );
        const response = await login(values);
        console.log(`Response : ${response}`);
        if (response.data?.login.errors) {
          setErrors(toErrorMap(response.data.login.errors));
          console.log(`Errors : ${response.data.login.errors.toString}`);
        } else if (response.data?.login.user) {
          if (typeof router.query.next === "string") {
            router.push(router.query.next);
          } else {
            // worked
            router.push("/");
          }
        }
      }}
    >
      {({ isSubmitting }) => (
        <Flex
          flexDirection="column"
          width="100wh"
          height="100vh"
          backgroundColor="gray.200"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar bg="teal.500" />
            <Heading color="teal.400">Welcome</Heading>
            <Box minW={{ base: "90%", md: "468px" }}>
              <Form>
                <Stack
                  spacing={4}
                  p="1rem"
                  backgroundColor="whiteAlpha.900"
                  boxShadow="md"
                >
                  <InputField
                    placeholder="Username or Email"
                    name="usernameOrEmail"
                    icon={<Person style={{ color: pink[500] }} />}
                  />
                  <FormControl>
                    <InputGroup>
                      <InputField
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        icon={<Lock style={{ color: pink[500] }} />}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormHelperText textAlign="right">
                      <NextLink href="/forgot-password">
                        <Link>forgot password?</Link>
                      </NextLink>
                    </FormHelperText>
                  </FormControl>
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                    isLoading={isSubmitting}
                  >
                    Login
                  </Button>
                </Stack>
              </Form>
            </Box>
          </Stack>
          <Box>
            New to us?{" "}
            <Link color="teal.500" href="#">
              Sign Up
            </Link>
          </Box>
        </Flex>
      )}
    </Formik>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
