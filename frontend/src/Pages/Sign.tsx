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
  Toast,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { LoginSchema, SigninSchema } from "../Utils";
import axios, {AxiosResponse} from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Spin from "../Components/spin";

const init: SigninSchema = {
  email: "",
  password: "",
  username:""
};

export default function Sign() {
  const Toast = useToast();
  const navigate = useNavigate();
  const [form, setform] = useState<SigninSchema>({ ...init });
  const [loading, setloading] = useState(false);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const key: string = e.target.getAttribute("id") || "";
    const value: string = e.target.value;
    setform((prev) => ({ ...prev, [key]: value }));
  }
  async function handleSubmit() {
    try {
      setloading(true);
      await axios.post("http://localhost:4500/auth/signup", {...form,});
      setloading(false);
      Toast({
        title: "Success",
        description: "Your account is created",
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      return navigate('/login');
    } catch (error:any) {
      setloading(false);
      Toast({
        title: "Error",
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  }

  return (
    <Flex
    h={'91vh'}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Create your account</Heading>
          {loading?<Spin/>:""}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
          <FormControl >
              <FormLabel>UserName</FormLabel>
              <Input  onChange={handleChange} id="username" type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input  onChange={handleChange} id="email" type="email" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                
                onChange={handleChange}
                id="password"
                type="password"
              />
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
                Sign Up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
