import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import RangeFilter from "./RangeFilter";

export interface FilterSchema {
  priceRange: number[];
  setpriceRange: (e: any) => void;
  mileageRange: number[];
  setmileageRange: (e: any) => void;
  color: string[];
  setcolor: (e: any) => void;
  search:"",
  setsearch:(value:string)=>void
}

const Filter = ({
  priceRange,
  setpriceRange,
  mileageRange,
  setmileageRange,
  color,
  setcolor,
  search, 
  setsearch
}: FilterSchema) => {
  const ref = useRef<any>();
  return (
    <Flex
      w="300px"
      border={"2px solid blue"}
      p="10px"
      justifyContent={"center"}
    >
      <Box border={"2px solid blue"}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Input ref={ref}  type="text" />
          <Button onClick={()=>{setsearch(ref.current.value)}}>Search</Button>
        </Box>
        <RangeFilter
          title={"Price"}
          max={100000}
          min={0}
          priceRange={priceRange}
          onChange={(e) => {
            setpriceRange(e);
          }}
          step={5000}
        />
        <RangeFilter
          title={"Mileage"}
          max={50}
          min={0}
          priceRange={mileageRange}
          onChange={(e) => {
            setmileageRange(e);
          }}
          step={5}
        />

        <Box display={"flex"} gap="4" flexDir={"column"}>
          <Text fontWeight={"bold"} fontSize={"18px"} mt="1rem">
            Select Color
          </Text>
          <CheckboxGroup colorScheme="gray" onChange={setcolor}>
            <Checkbox value="yellow">
              Yellow
            </Checkbox>
            <Checkbox checked={color.includes("red")} value="red">
              Red
            </Checkbox>
            <Checkbox checked={color.includes("black")} value="black">
              Black
            </Checkbox>
            <Checkbox checked={color.includes("gray")} value="gray">
              Gray
            </Checkbox>
            <Checkbox checked={color.includes("silver")} value="silver">
              Silver
            </Checkbox>
            <Checkbox checked={color.includes("blue")} value="blue">
              Blue
            </Checkbox>
            <Checkbox checked={color.includes("white")} value="white">
              White
            </Checkbox>
          </CheckboxGroup>
        </Box>
      </Box>

      <Divider orientation="vertical" />
    </Flex>
  );
};

export default Filter;
