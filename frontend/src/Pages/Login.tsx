import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { LoginSchema } from "../Utils";
import axios, { AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router-dom";
import Spin from "../Components/Spin";

const init: LoginSchema = {
  email: "",
  password: "",
};

export default function Login() {
  const Toast = useToast();
  const navigate = useNavigate();
  const [form, setform] = useState<LoginSchema>({ ...init });
  const [loading, setloading] = useState(false);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const key: string = e.target.getAttribute("id") || "";
    const value: string = e.target.value;
    setform((prev) => ({ ...prev, [key]: value }));
  }
  async function handleSubmit() {
    try {
      setloading(true);
      const data: AxiosResponse<{ token: string }> = await axios.post(
        "http://localhost:4500/auth/login",
        {
          ...form,
        }
      );
      sessionStorage.setItem(
        "login_cred",
        JSON.stringify({ token: data.data.token, email: form.email })
      );
      setloading(false);
      Toast({
        title: "Success",
        description: "Your account is created",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      return navigate("/");
    } catch (error: any) {
      setloading(false);
      Toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  return (
      <Flex
        border={'2px solid blue'}
        h={'91vh'}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Login to your account</Heading>
            {loading ? <Spin /> : ""}
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input onChange={handleChange} id="email" type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input onChange={handleChange} id="password" type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  onClick={handleSubmit}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Login
                </Button>

                <Link style={{ textAlign: "center" }} to="/signup">
                  or SignUp
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
  );
}
