import { Box, Button, VStack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword({ email: values.email });
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              if an account with that email exists, we sent you can email
            </Box>
          ) : (
            <Form>
              <VStack spacing={4} align="stretch">
                <InputField
                  name="email"
                  placeholder="email"
                  label="Email"
                  type="email"
                />
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="pink"
                  alignSelf="center"
                  width="36"
                >
                  Forgot Password
                </Button>
              </VStack>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
