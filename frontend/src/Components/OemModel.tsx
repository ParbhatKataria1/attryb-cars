import {
  Box,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
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
}

const OemModel = ({ setitem, item }: OemModelSchema) => {
  const token: string = JSON.parse(
    sessionStorage.getItem("login_cred") || ""
  )?.token;
  const [search, setsearch] = useState<String>("");
  const [oemid, setoemid] = useState<string>("");
  const [oemdata, set_oemdata] = useState<OemSchema[]>([]);
  async function fetch_oem() {
    let data: AxiosResponse<{ data: OemSchema[] }> = await axios.get(
      "http://localhost:4500/oem",
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
      <FormControl mt="10px" w="100%" id="oem_spec">
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
      <Box>
        <Grid
          mt="10px"
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
          }}
          gap={1}
        >
          <Box
            w="390px"
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
              <svg
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width={"40px"}
                height={"40px"}
              >
                <path
                  d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z"
                  fill-rule="nonzero"
                />
              </svg>
            </Flex>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default OemModel;
