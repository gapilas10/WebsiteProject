import React, { useState } from "react";
import { Box, Button, Flex, Link, VStack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import NextLink from "next/link";
import { toErrorMap } from "../../utils/toErrorMap";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token:
              typeof router.query.token === "string" ? router.query.token : "",
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            // worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <VStack spacing={4} align="stretch">
              <InputField
                name="newPassword"
                placeholder="new password"
                label="New Password"
                type="password"
              />
              {tokenError ? (
                <Flex>
                  <Box mr={2} style={{ color: "red" }}>
                    {tokenError}
                  </Box>
                  <NextLink href="/forgot-password">
                    <Link>click here to get a new one</Link>
                  </NextLink>
                </Flex>
              ) : null}
              <Button
                type="submit"
                isLoading={isSubmitting}
                loadingText="Updating"
                colorScheme="pink"
                alignSelf="center"
                width="36"
              >
                Change Password
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
