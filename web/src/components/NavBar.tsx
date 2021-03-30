import { Box, Flex, Link } from "@chakra-ui/layout";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Button } from "@chakra-ui/react";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  // data is loading
  if (fetching) {
    //user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">Register</Link>
        </NextLink>
      </>
    );
    // user is logged in
  } else {
    console.log("user= ", data.me.username);
    body = (
      <Box>
        <Flex>
          <Box mr={2} color="white">
            {data.me.username}
          </Box>
          <Button
            variant="link"
            color="white"
            onClick={() => {
              logout();
            }}
            isLoading={logoutFetching}
            loadingText="Logging out"
          >
            Logout
          </Button>
        </Flex>
      </Box>
    );
  }
  return (
    <Flex bg="pink.200" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
