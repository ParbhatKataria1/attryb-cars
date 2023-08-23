import {
  Flex,
  Input,
  InputGroup,
  Select,
  Text,
  useToast,
  FormControl,
  FormLabel,
  InputLeftAddon,
  InputRightAddon,
  Spinner,
  Button,
  Box,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { AddItemSchema } from "../Utils";
import axios from "axios";
import DescriptionBox from "../Components/Description";
import OemModel from "../Components/OemModel";

const init: AddItemSchema = {
  title: "This is a new car",
  image: "",
  scratches: 0,
  odometer: 0,
  registration_place: "",
  original_paint: "",
  description: [],
  reported_accident: 0,
  previous_buyer: 0,
  user: "",
  oem_spec: "",
};
export default function Addfile() {
  const token: string = JSON.parse(
    sessionStorage.getItem("login_cred") || ""
  )?.token;
  const [item, setitem] = useState<AddItemSchema>({ ...init });
  const inputRef = useRef<any>();
  const [loading, setloading] = useState(false);
  const [load, setload] = useState(false);
  const toast = useToast();

  function change(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    let name: string = e.target.getAttribute("id") || "";
    let value: string | number = "";
    if (isNaN(+e.target.value)) {
      value = e.target.value;
    } else value = +e.target.value;
    setitem({ ...item, [name]: value });
  }

  function addvalue() {
    let value = inputRef.current?.value;
    let obj = { ...item };
    obj.description.push(value);
    setitem(obj);
    inputRef.current.value = "";
  }

  async function submitUpdate() {
    try {
      setloading(true);
      await axios.post(
        `https://attryb-cars.onrender.com/inventory`,
        { ...item },
        { headers: { Authorization: token } }
      );
      setloading(false);
      toast({
        title: "Done",
        description: "Data is saved",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error: any) {
      setloading(false);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }
  async function handleUpload(e: any) {
    const data = new FormData();
    let image = e.target?.files[0];
    data.append("file", image);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "dkcllnjpz");
    setload(true);
    let temp = await axios.post(
      `https://api.cloudinary.com/v1_1/dkcllnjpz/image/upload`,
      data
    );
    setload(false);
    setitem((prev) => ({ ...prev, image: temp?.data.secure_url }));
  }
  return (
    <Box h="90vh" overflowX={"auto"} overflowY={"auto"}>
      <Box w="94%" margin={"auto"} py={"20px"}>
        <Box w="100%">
          <FormControl w="100%" id="image">
            <FormLabel>Image</FormLabel>
            <InputGroup>
              <InputLeftAddon children="https://" />
              <Input
                colorScheme="teal"
                value={item.image}
                onChange={change}
                id="image"
              />
            </InputGroup>
            <Box>
              <Text textAlign={"center"} mt="10px">
                Or
              </Text>
              <Flex w="100%" my="20px">
                <input onChange={handleUpload} type="file" id="image" />
                <Text
                  ml="20px"
                  visibility={load ? "unset" : "hidden"}
                  display={"inline"}
                >
                  Uploading
                </Text>
                <Spinner ml="8px" visibility={load ? "unset" : "hidden"} />
              </Flex>
            </Box>
          </FormControl>
          <FormControl mt="10px" w="100%" id="description">
            <FormLabel>Description</FormLabel>
            <InputGroup>
              <Input ref={inputRef} name="description" />
              <Button onClick={addvalue}>
                <InputRightAddon children="Add" />
              </Button>
            </InputGroup>
          </FormControl>
          <DescriptionBox item={item} setitem={setitem} />

          <Flex justifyContent={"space-between"}>
            <FormControl mt="10px" w="45%" id="odometer">
              <FormLabel>Odometer</FormLabel>
              <Input
                type="number"
                onChange={change}
                value={item.odometer + ""}
                id="odometer"
              />
            </FormControl>
            <FormControl mt="10px" w="45%" id="original_paint">
              <FormLabel>Original Paint</FormLabel>
              <Select
                onChange={change}
                value={item.original_paint}
                placeholder="Choose Color"
                id="original_paint"
              >
                <option value="silver">Silver</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="white">White</option>
                <option value="yellow">Yellow</option>
                <option value="black">Black</option>
              </Select>
            </FormControl>
          </Flex>

          <OemModel setitem={setitem} item={item} justvalue={1} />

          <Flex
            flexDir={{ base: "column", sm: "row" }}
            justifyContent={"space-between"}
          >
            <FormControl
              mt="10px"
              w={{ base: "100%", sm: "45%" }}
              id="previous_buyer"
            >
              <FormLabel>Previous Buyer</FormLabel>
              <Input
                onChange={change}
                value={item.previous_buyer + ""}
                type="number"
                name="previous_buyer"
              />
            </FormControl>
            <FormControl
              mt="10px"
              w={{ base: "100%", sm: "45%" }}
              id="registration_place"
            >
              <FormLabel>Registration Place</FormLabel>
              <Input
                onChange={change}
                value={item.registration_place}
                type="text"
                name="registration_place"
              />
            </FormControl>
          </Flex>

          <Flex
            flexDir={{ base: "column", sm: "row" }}
            justifyContent={"space-between"}
          >
            <FormControl
              mt="10px"
              w={{ base: "100%", sm: "45%" }}
              id="reported_accident"
            >
              <FormLabel>Reported Accident</FormLabel>
              <Input
                onChange={change}
                value={item.reported_accident + ""}
                type="number"
                name="reported_accident"
              />
            </FormControl>
            <FormControl
              mt="10px"
              w={{ base: "100%", sm: "45%" }}
              id="scratches"
            >
              <FormLabel>Scratches</FormLabel>
              <Input
                onChange={change}
                value={item.scratches + ""}
                type="number"
                name="scratches"
              />
            </FormControl>
          </Flex>
        </Box>

        <Box mt="20px">
          <Button onClick={submitUpdate} colorScheme="blue">
            Done{" "}
            <Spinner
              bg="none"
              visibility={loading ? "unset" : "hidden"}
              ml="10px"
            />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
