import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { InventorySchema, OemSchema } from "../Utils";
import axios, { AxiosResponse } from "axios";

interface OemModelSchema {
  setitem: (obj: InventorySchema) => void;
  item: InventorySchema;
  justvalue?: number;
}

const OemModel = ({ setitem, item, justvalue }: OemModelSchema) => {
  const token: string = JSON.parse(
    sessionStorage.getItem("login_cred") || ""
  )?.token;
  const [search, setsearch] = useState<String>("");
  const [oemid, setoemid] = useState<string>("");
  const [oemdata, set_oemdata] = useState<OemSchema[]>([]);
  async function fetch_oem() {
    let data: AxiosResponse<{ data: OemSchema[] }> = await axios.get(
      `https://attryb-cars.onrender.com/oem`,
      { headers: { Authorization: token } }
    );
    set_oemdata(data.data.data);
  }

  function selected_oem(id: string) {
    let obj: InventorySchema = { ...item, oem_spec: id };
    setitem(obj);
    setoemid(id);
  }
  useEffect(() => {
    fetch_oem();
  }, []);
  return (
    <>
      <FormControl mt="10px" w="100px" id="oem_spec">
        <Flex alignItems={"center"}>
          <FormLabel>OEM Spec</FormLabel>
          <Input
            w="70%"
            placeholder="Search OEM"
            onChange={(e) => {
              setsearch(e.target.value);
            }}
          ></Input>
        </Flex>
      </FormControl>
      <Box w="100%">
        <Box
          w={justvalue ? { base: "400px", md: "100%" } : "100%"}
          mt="20px"
          border={"1px solid lightgray"}
          overflowX={"auto"}
          textAlign={"left"}
          borderRadius={"10px"}
          fontSize={"15px"}
          p="8px"
        >
          <TableContainer mt="15px">
            <Table size="sm" fontSize={"23px"}>
              <Thead>
                <Tr color={"white"}>
                  <Th>Model</Th>
                  <Th isNumeric>Year</Th>
                  <Th isNumeric>Price</Th>
                  <Th isNumeric>Max Speed</Th>
                  <Th isNumeric>Mileage</Th>
                  <Th isNumeric>Power</Th>
                  <Th>Color</Th>
                </Tr>
              </Thead>

              <Tbody>
                {!oemdata.length
                  ? null
                  : oemdata
                      .filter((el) =>
                        el.model.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((data) => {
                        return (
                          <Tr
                            key={data._id}
                            cursor={"pointer"}
                            onClick={() => {
                              selected_oem(data._id);
                            }}
                            w="95%"
                            border={
                              oemid == data._id
                                ? "2px solid green"
                                : `2px solid #eaeaea`
                            }
                            textAlign={"left"}
                            borderRadius={"10px"}
                            fontSize={"15px"}
                            p="8px"
                          >
                            <Td>{data.model}</Td>
                            <Td isNumeric>{data.year + ""}</Td>
                            <Td isNumeric>{data.price + ""} Rs</Td>
                            <Td isNumeric>{data.speed + ""} Km/h</Td>
                            <Td isNumeric>{data.mileage + ""} Km/l</Td>
                            <Td isNumeric>{data.power + ""} BHP</Td>
                            <Td>
                              {
                                <Flex
                                  alignItems={"center"}
                                  justifyContent={"space-between"}
                                >
                                  {data.color.map((col) => {
                                    return (
                                      <Box
                                        key={col + ""}
                                        display={"inline-flex"}
                                        borderRadius={"50%"}
                                        m="5px"
                                        w="15px"
                                        h="15px"
                                        bg={col + ""}
                                        border="2px solid lightgray"
                                      ></Box>
                                    );
                                  })}
                                </Flex>
                              }
                            </Td>
                          </Tr>
                        );
                      })}
              </Tbody>
            </Table>
          </TableContainer>
          <Flex
            display={{ base: "flex", md: "none" }}
            alignItems={"center"}
            mt="10px"
            justifyContent={"center"}
          >
            <Text fontSize={"17px"} fontWeight={"semibold"} mr="10px">
              Swipe Right
            </Text>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default OemModel;
