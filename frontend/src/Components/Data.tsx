import { AllDataSchema, InventorySchema } from "../Utils";
import { Box, Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react";

const Data = ({ data, length, user }:AllDataSchema) => {
    console.log(data)
  return (
    <div>
      {data?.map((el:InventorySchema) => {
        return (
          <Card
          key={el._id}
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src={el.image}
              alt={el.title}
            />

            <Stack>
              <CardBody>
                <Heading size="md">{el?.oem[0]?.model}</Heading>

                <Text py="2">
                  Price : {el?.oem[0]?.price+""}
                </Text>
                <Text py="2">
                  color : {el?.oem[0]?.color?.map((el:String)=>{
                    return <Box display={'inline'} w='30px' h='30px' borderRadius={'50%'}  bg={el}></Box>
                  })}
                </Text>
                <Text py="2">
                  Mileage : {el?.oem[0]?.mileage+""}
                </Text>
              </CardBody>

              <CardFooter>
                <Button variant="solid" colorScheme="blue">
                  Buy Latte
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        );
      })}
    </div>
  );
};

export default Data;
