import { AllDataSchema, InventorySchema } from "../Utils";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ButtonDialog } from "./Alert";
import axios from "axios";
import { UpdateModel } from "./UpdateModel";
import { Link } from "react-router-dom";

interface temp{page:number, setpage:(value:number)=>void}
type DataSchema = AllDataSchema & temp;
const Data = (
  { data, length, userId, page, setpage }: DataSchema
) => {
  const Toast = useToast();
  const token: string =
    JSON.parse(sessionStorage.getItem("login_cred") || "").token || "";
  const setdelete: (_id: string) => void = async (_id) => {
    try {
      await axios.delete(
        `http://localhost:4500/inventory?_id=${_id}&user=${userId}`,
        {
          headers: { Authorization: token },
        }
      );
      Toast({
        title: "Success",
        description: "Item is deleted",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      Toast({
        title: "Error",
        description: "Item is not deleted",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  return (
    <Box w='100%' overflowY={'auto'}>
      <Grid mx="auto" gridTemplateColumns={"repeat(3, 1fr)"} gap={5}>
        {data?.map((el: InventorySchema) => {
          return (
            <Box
              key={el._id}
              display={"flex"}
              flexDir={{ base: "column", sm: "row" }}
              mx="auto"
              mt='20px'
              w="350px"
              overflow="hidden"
              border={"2px solid #efefef"}
              borderRadius={'10px'}
            >
              <Box w="100%" display={"flex"} flexDir={"column"}>
                <Image
                  display={"inline-block"}
                  mx="auto"
                  borderBottom={"1px solid lightgray"}
                  w='100%'
                  src={el.image}
                  alt={el.title}
                  h="200px"
                />
                <Flex
                  p="10px"
                  flexDir={"column"}
                  w="100%"
                >
                  <Box>
                    <Heading size="md">{el?.oem[0]?.model}</Heading>

                    <Text py="2">Price : {el?.oem[0]?.price + ""}</Text>
                    <Box py="2">
                      color :{" "}
                      {el?.oem[0]?.color?.map((el: String, ind: number) => {
                        return (
                          <Box
                            key={ind}
                            display={"inline-block"}
                            w="20px"
                            h="20px"
                            ml="10px"
                            borderRadius={"50%"}
                            bg={el+""}
                          ></Box>
                        );
                      })}
                    </Box>
                    <Text py="2">Mileage : {el?.oem[0]?.mileage + ""}</Text>
                  </Box>

                  <Flex justifyContent={"space-between"}>
                    {userId === el.user ? <UpdateModel {...el} /> : ""}
                    {userId === el.user ? (
                      <ButtonDialog
                        title="Delete"
                        _id={el._id || ""}
                        heading="Delete this Item"
                        description={"Are you "}
                        setdelete={setdelete}
                      />
                    ) : (
                      ""
                    )}
                    <Link to={`/details/${el._id}`}>
                      <Button>More Details</Button>
                    </Link>
                  </Flex>
                </Flex>
              </Box>
            </Box>
          );
        })}
      </Grid>

      <Box mt='20px'>
        <Flex
          alignItems={"center"}
          w={"98%"}
          justifyContent={"center"}
          m={"auto"}
        >
          {
            <Button
              isDisabled={page != 1 ? false : true}
              onClick={() =>
                setpage(page-1)
              }
            >
              Prev
            </Button>
          }


          <Button m="9px">{page}</Button>

          {
            <Button
              isDisabled={page != Math.ceil(+length / 8) ? false : true}
              onClick={() =>
                setpage(page+1)
              }
            >
              Next
            </Button>
          }
        </Flex>
      </Box>
    </Box>
  );
};

export default Data;
