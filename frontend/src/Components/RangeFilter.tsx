import React from 'react'
import {
  Box,
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from '@chakra-ui/react'

interface RangeFilterSchema{
    min:number, 
    max:number, title:string, priceRange:number[], onChange:(e:any)=>void,
    step:number
}
const RangeFilter = ({ min, max, title, priceRange, onChange, step }:RangeFilterSchema) => {
  return (
    <Box>
      <Text fontWeight={'bold'} fontSize={'18px'} my='1rem'>Select {title} Range</Text>
      <RangeSlider
        aria-label={['min', 'max']}
        defaultValue={priceRange}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack bg={'gray'} />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} bg='gray' />
        <RangeSliderThumb index={1} bg='gray' />
      </RangeSlider>
      <Flex justify={'space-between'} >
        <Box>Min:{priceRange[0]}</Box>
        <Box>Max:{priceRange[1]}</Box>
      </Flex>
    </Box>
  )
}

export default RangeFilter