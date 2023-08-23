import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { gear } from "../svg";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  let email;
  if (sessionStorage.getItem("login_cred"))
    email = JSON.parse(sessionStorage.getItem("login_cred") || "")?.email;
  return (
    <Box h='9vh' p="15px" w='100vw' borderBottom={'1px solid lightgray'}>
      <Flex
        justifyContent={"space-between"}
        w="93%"
        mx="auto"
        alignItems={"center"}
      >
        <Flex
          transform={"scale(1.43)"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M21.41 14.515c.237-.893 1.314-.889 2.59-1.208v-2.612c-.907-.227-2.352-.313-2.592-1.217l-.001-.006c-.239-.89.639-1.373 1.639-2.34l-1.306-2.263c-.911.26-2.195.903-2.863.237-.646-.643-.114-1.552.255-2.845l-2.263-1.306c-.649.671-1.446 1.878-2.348 1.637l-.006-.001c-.892-.238-.889-1.313-1.209-2.591h-2.612c-.228.911-.313 2.351-1.217 2.592l-.006.002c-.891.238-1.373-.64-2.34-1.64l-2.262 1.307c.26.911.903 2.195.237 2.863-.644.646-1.553.114-2.845-.255l-1.306 2.262c.67.649 1.878 1.446 1.637 2.348l-.001.006c-.238.893-1.317.89-2.59 1.208v2.612c.907.227 2.352.313 2.592 1.217l.002.006c.238.891-.64 1.373-1.64 2.34l1.306 2.263c.911-.26 2.195-.903 2.863-.237.646.643.114 1.552-.255 2.845l2.263 1.306c.649-.671 1.446-1.878 2.348-1.637l.006.001c.893.238.889 1.313 1.208 2.59h2.612c.228-.911.313-2.351 1.217-2.592l.006-.002c.891-.238 1.373.64 2.34 1.64l2.263-1.306c-.26-.909-.904-2.193-.237-2.863.643-.646 1.552-.114 2.845.255l1.306-2.263c-.671-.649-1.878-1.446-1.637-2.348l.001-.005zm-9.41 1.485c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z" />
          </svg>
          <Text fontSize={"22px"} ml="10px" fontWeight={"bolder"}>
            GearHead
          </Text>
        </Flex>

        {email && (
          <Flex alignItems={"center"}>
            <Flex
              mr="10px"
              cursor={"unset"}
              justifyContent={"center"}
              alignItems={"center"}
              w="30px"
              h="30px"
              fontWeight={"bold"}
              bg="gray"
              color={"white"}
              borderRadius={"50%"}
              fontSize={"15px"}
            >
              {email[0]}
            </Flex>
            <Button
              colorScheme="red"
              mr="10px"
              size="sm"
              onClick={() => {
                sessionStorage.removeItem("login_cred");
                navigate("/login");
              }}
            >
              LogOut
            </Button>
            <Link  to="/addfile">
              <Button mr={"10px"} size="sm" colorScheme={"blue"}>
                Add Car
              </Button>
            </Link>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
