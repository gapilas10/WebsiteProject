import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
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
        <Flex p={4}>
          <NextLink href="/login">
            <Link color="white" mr={4} fontSize={20}>
              Login
            </Link>
          </NextLink>
          <NextLink href="/register">
            <Link color="white" fontSize={20}>
              Register
            </Link>
          </NextLink>
        </Flex>
      </>
    );
    // user is logged in
  } else {
    console.log("user= ", data.me.username);
    body = (
      <Box>
        <Flex p={4}>
          <Flex>
            <Box mr={4} color="white" fontSize={16} alignSelf="center">
              logged in as:{" "}
            </Box>
            <Box mr={4} color="white" fontSize={20}>
              {data.me.username}
            </Box>
          </Flex>
          <Button
            variant="link"
            color="black"
            onClick={() => {
              logout();
            }}
            isLoading={logoutFetching}
            fontSize={20}
          >
            Logout
          </Button>
        </Flex>
      </Box>
    );
  }
  return (
    <Flex zIndex={1} position="sticky" bg="pink.200" p={4}>
      <Flex flex={1} m="auto">
        <NextLink href="/">
          <Link>
            <Heading>Hand Crafted With Love</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
