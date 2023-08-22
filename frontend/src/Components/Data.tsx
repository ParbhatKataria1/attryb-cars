import { AllDataSchema, InventorySchema } from "../Utils";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ButtonDialog } from "./Alert";
import axios from "axios";
import { UpdateModel } from "./UpdateModel";
import { Link } from "react-router-dom";

const Data = ({ data, length, userId }: AllDataSchema) => {
  const Toast = useToast();
  const token: string =
    JSON.parse(sessionStorage.getItem("login_cred") || "").token || "";
  const setdelete: (_id: string) => void = async (_id) => {
    try {
      await axios.delete(`http://localhost:4500/inventory?_id=${_id}&user=${userId}`, {
        headers: { Authorization: token },
      });
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
    <Box>
      {data?.map((el: InventorySchema) => {
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

                <Text py="2">Price : {el?.oem[0]?.price + ""}</Text>
                <Text py="2">
                  color :{" "}
                  {el?.oem[0]?.color?.map((el: String, ind: number) => {
                    return (
                      <Box
                        key={ind}
                        display={"inline"}
                        w="30px"
                        h="30px"
                        borderRadius={"50%"}
                        bg={el+""}
                      ></Box>
                    );
                  })}
                </Text>
                <Text py="2">Mileage : {el?.oem[0]?.mileage + ""}</Text>
              </CardBody>

              <CardFooter>
                {userId === el.user ? <UpdateModel {...el} /> : ""}
                {userId === el.user ? (
                  <ButtonDialog
                    title="Delete"
                    _id={el._id}
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
              </CardFooter>
            </Stack>
          </Card>
        );
      })}
    </Box>
  );
};

export default Data;
