import { Box, Button, Checkbox, CheckboxGroup, Divider, Flex, Input, Text } from "@chakra-ui/react";
import { useRef } from "react";
import RangeFilter from "./RangeFilter";

export interface FilterSchema {
    priceRange: number[];
    setpriceRange: (e: any) => void;
    mileageRange: number[];
    setmileageRange: (e: any) => void;
    color: string[];
    setcolor: (e: any) => void;
    search: "";
    setsearch: (value: string) => void;
}

const Filter = ({ priceRange, setpriceRange, mileageRange, setmileageRange, color, setcolor, setsearch }: FilterSchema) => {
    const ref = useRef<any>();
    return (
        <Flex w="350px" justifyContent={"center"}>
            <Box p="20px">
                <Flex display={"flex"} w="100%" justifyContent={"space-between"}>
                    <Input ref={ref} type="text" />
                    <Button
                        onClick={() => {
                            setsearch(ref.current.value);
                        }}
                    >
                        Search
                    </Button>
                </Flex>
                <RangeFilter
                    title={"Price"}
                    max={4000000}
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
                        <Checkbox value="Yellow">Yellow</Checkbox>
                        <Checkbox checked={color.includes("Red")} value="Red">
                            Red
                        </Checkbox>
                        <Checkbox checked={color.includes("Black")} value="Black">
                            Black
                        </Checkbox>
                        <Checkbox checked={color.includes("Grey")} value="Grey">
                            Grey
                        </Checkbox>
                        <Checkbox checked={color.includes("Silver")} value="Silver">
                            Silver
                        </Checkbox>
                        <Checkbox checked={color.includes("Blue")} value="Blue">
                            Blue
                        </Checkbox>
                        <Checkbox checked={color.includes("White")} value="White">
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
