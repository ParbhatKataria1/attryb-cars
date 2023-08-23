import { AllDataSchema } from "../Utils";
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
import { useContext } from "react";
import { ParamContext } from "../Context/SearchParam";
import { UseAppDispatch } from "../redux/store";
import { fetch_data } from "../redux/data/action";

const Data = ({ data, length, userId, }: AllDataSchema) => {
  const { priceRange, mileageRange, pagevalue, color, search, setpage, setparams } =
    useContext<any>(ParamContext);
  const dispatch = UseAppDispatch();
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
      dispatch(
        fetch_data(
          {
            page: pagevalue,
            color,
            min_price: priceRange[0],
            max_price: priceRange[1],
            min_mileage: mileageRange[0],
            max_mileage: mileageRange[1],
            search,
          },
          token
        )
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

  const changePage = (value:number)=>{
    setpage(value);
    let obj = {page: value,
      color,
      min_price: priceRange[0],
      max_price: priceRange[1],
      min_mileage: mileageRange[0],
      max_mileage: mileageRange[1],
      search}
      setparams(obj)
    dispatch(
      fetch_data(
        obj,
        token
      )
    );
  }
  return (
    <Box w="100%" overflowY={"auto"}>
      <Grid p='10px' mx="auto" gridTemplateColumns={{base:"repeat(1, 1fr)",md:"repeat(2, 1fr)", lg: "repeat(3, 1fr)"}} gap={5}>
        {data?.map((el: any) => {
          return (
            <Box
              key={el._id}
              display={"flex"}
              flexDir={{ base: "column", sm: "row" }}
              mx="auto"
              mt="20px"
              overflow="hidden"
              border={"2px solid #efefef"}
              borderRadius={"10px"}
              w={'100%'}
            >
              <Box w="100%" display={"flex"} flexDir={"column"}>
                <Image
                  display={"inline-block"}
                  mx="auto"
                  borderBottom={"1px solid lightgray"}
                  w="100%"
                  src={el.image}
                  alt={el.title}
                  h="200px"
                />
                <Flex p="10px" flexDir={"column"} w="100%">
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
                            bg={el + ""}
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
                      <Button size='sm'>More Details</Button>
                    </Link>
                  </Flex>
                </Flex>
              </Box>
            </Box>
          );
        })}
      </Grid>

      <Box mt="20px">
        <Flex
          alignItems={"center"}
          w={"98%"}
          justifyContent={"center"}
          m={"auto"}
        >
          {
            <Button
              isDisabled={pagevalue != 1 ? false : true}
              onClick={() => changePage(+pagevalue - 1)}
            >
              Prev
            </Button>
          }

          <Button m="9px">{pagevalue}</Button>

          {
            <Button
              isDisabled={pagevalue != Math.ceil(+length / 8) ? false : true}
              onClick={() => changePage(+pagevalue + 1)}
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
