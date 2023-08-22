import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { InventorySchema } from "../Utils";

interface DescriptionBox{
    item:InventorySchema,
    setitem:(obj:InventorySchema)=>void
}

const DescriptionBox = ({item, setitem}:DescriptionBox) => {
    function deleteItem(i:number) {
        let obj = { ...item };
        let arr = obj.description.filter((el, ind:number) => {
          return ind != i;
        });
        obj.description = arr;
        setitem(obj);
      }
  return (
    <Box
      p={item.description.length ? "5px" : "0px"}
      borderRadius={"10px"}
      mt="10px"
    >
      {item.description.length &&
        item.description?.map((el, ind) => {
          return (
            <Flex
              mt="4px"
              borderRadius={"10px"}
              justifyContent={"space-between"}
              p="7px"
              bg="pink.400"
            >
              {el.length >= 20 ? [...el].splice(0, 20).join("") + "..." : el}
              <span
                onClick={() => {
                  deleteItem(ind);
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
              >
                <svg
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  stroke-linejoin="round"
                  width="30px"
                  height="30px"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
                </svg>
              </span>
            </Flex>
          );
        })}
    </Box>
  );
};

export default DescriptionBox;
