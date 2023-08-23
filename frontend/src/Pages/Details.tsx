import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InventorySchema } from "../Utils";
import axios, { AxiosResponse } from "axios";
import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";

const Details = () => {
  const { _id } = useParams();
  const [item, setitem] = useState<any>();
  const token: string = JSON.parse(
    sessionStorage.getItem("login_cred") || ""
  )?.token;
  async function fetch() {
    const temp: AxiosResponse<{ data: InventorySchema }> = await axios.get(
      `http://localhost:4500/inventory/${_id}`,
      { headers: { Authorization: token } }
    );
    setitem(temp?.data?.data);
  }
  useEffect(() => {
    fetch();
  }, []);
  return (
    <Flex flexDir={{base:'column', md:'row'}} h='90vh' p='20px' w='100%' pt='20px' mx='auto' justifyContent={'space-between'}  overflowY={'auto'}>
        <Image  m='auto'   w={{base:'80%', md:'40%'}} objectFit={'contain'} src={item?.image} />
        <Box
        m='auto'
          border={"2px solid #eaeaea"}
          textAlign={"left"}
          borderRadius={"10px"}
          fontSize={"21px"}
          p="20px"
          w={{base:'80%', md:'60%'}}
        >
          <Flex
          w='100%'
            fontSize={"19px"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text>Model: </Text>
            <Text>
              {item?.oem[0]?.model ? item.oem[0]?.model : "Not Mentioned"}
            </Text>
          </Flex>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
            mt="15px"
          >
            <Text>Year</Text>
            <Text>
              {item?.oem[0]?.year ? item?.oem[0]?.year+"" : "Not Mentioned"}
            </Text>
          </Flex>

          <Divider orientation="horizontal" />
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
          >
            <Text>Price</Text>
            <Text>
              {item?.oem[0]?.price
                ? item?.oem[0]?.price + " Rs"
                : "Not Mentioned"}
            </Text>
          </Flex>

          <Divider orientation="horizontal" />
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
          >
            <Text>Max Speed</Text>
            <Text>
              {item?.oem[0]?.speed
                ? item?.oem[0]?.speed + "Km/h"
                : "Not Mentioned"}
            </Text>
          </Flex>

          <Divider orientation="horizontal" />
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
          >
            <Text>Mileage</Text>
            <Text>
              {item?.oem[0]?.mileage
                ? item?.oem[0]?.mileage + "Km/l"
                : "Not Mentioned"}
            </Text>
          </Flex>

          <Divider orientation="horizontal" />
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
          >
            <Text>Power</Text>
            <Text>
              {item?.oem[0]?.power
                ? item?.oem[0]?.power + "BHP"
                : "Not Mentioned"}
            </Text>
          </Flex>

          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"19px"}
            mt="15px"
          >
            <Text>Colors</Text>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              {item?.oem[0]?.color.map((col:string) => {
                return (
                  <Box
                    display={"inline-flex"}
                    borderRadius={"50%"}
                    m="10px"
                    w="30px"
                    h="30px"
                    bg={col+""}
                    border="2px solid lightgray"
                  ></Box>
                );
              })}
            </Flex>
          </Flex>

          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
          >
            <Text>Scratches</Text>
            <Text>
              {item?.scratches ? item?.scratches + "" : "Not Mentioned"}
            </Text>
          </Flex>

          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
          >
            <Text>Odometer</Text>
            <Text>
              {item?.odometer ? item?.odometer + "" : "Not Mentioned"}
            </Text>
          </Flex>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
          >
            <Text>Registration Place</Text>
            <Text>
              {item?.registration_place
                ? item?.registration_place + ""
                : "Not Mentioned"}
            </Text>
          </Flex>

          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
          >
            <Text>Original Paint</Text>
            <Text>
              {item?.original_paint
                ? item?.original_paint + ""
                : "Not Mentioned"}
            </Text>
          </Flex>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
          >
            <Text>Reported Accident</Text>
            <Text>
              {item?.reported_accident
                ? item?.reported_accident + ""
                : "Not Mentioned"}
            </Text>
          </Flex>

          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
          >
            <Text>Previous Buyer</Text>
            <Text>
              {item?.previous_buyer
                ? item?.previous_buyer + ""
                : "Not Mentioned"}
            </Text>
          </Flex>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
            mt='20px'
          >
            <Text>Description</Text>
            
          </Flex>
          <ul style={{fontSize:'17px', marginLeft:'28px'}}>
              {item?.description?.map((el:string)=>{
                return <li>{el}</li>
              })}
            </ul>
        </Box>
    </Flex>
  );
};

export default Details;
