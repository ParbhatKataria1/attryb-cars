import { useEffect, useState } from "react";
import { stateSchema } from "../Utils";
import { UseAppDispatch, UseAppSelector } from "../redux/store";
import { fetch_data } from "../redux/data/action";
import Data from "../Components/Data";
import Spin from "../Components/spin";
import { Box, Flex, useToast } from "@chakra-ui/react";
import Filter from "../Components/Filter";
import { debounce } from "../functionUtils";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const item: stateSchema = UseAppSelector((store) => store.item);
  const [params, setparams] = useSearchParams();
  const Toast = useToast();
  const dispatch = UseAppDispatch();

  let param:any = {};
  param.pagevalue = params.get("pagevalue") || 1;
  param.limit = params.get("limit") || 8;
  param.min_price = params.get("min_price") || 0;
  param.max_price =params.get("max_price") || 5000000;
  param.min_mileage = params.get("min_mileage") || 0;
  param.max_mileage = params.get("max_mileage") || 50;
  param.color = params.getAll("color") || [];
  param.search = params.get("search") || "";
  param.sort = params.get('sort') || 1;
  
  console.log(param)
  const [priceRange, setpriceRange] = useState<number[]>([param.min_price, param.max_price]);
  const [mileageRange, setmileageRange] = useState<number[]>([param.min_mileage, param.max_mileage]);
  const [pagevalue, setpage] = useState(param.pagevalue );
  const [sort, setsort] = useState(param.sort);
  const [color, setcolor] = useState<string[]>(param.color|| []);
  const [search, setsearch] = useState(param.search)

  const obj = {
    priceRange,
    setpriceRange: debounce(setpriceRange, 300),
    mileageRange,
    setmileageRange: debounce(setmileageRange, 300),
    color,
    setcolor,
    search, 
    setsearch
  };

  const token: string = JSON.parse(
    sessionStorage.getItem("login_cred") || ""
  )?.token;
  useEffect(() => {
    let obj:any = {
      page:pagevalue,
      color,
      min_price: priceRange[0],
      max_price: priceRange[1],
      min_mileage: mileageRange[0],
      max_mileage: mileageRange[1],
      sortvalue: sort,
      search,}
    if (token) {
      dispatch(fetch_data(obj, token));
    } else {
      Toast({
        title: "Error",
        description: "Token is not valid",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    obj.pagevalue = obj.page;
    delete obj.page;
    setparams(obj);
  }, [priceRange, mileageRange, color, search]);
  console.log(color)
  return (
    <div>
      <Flex h="100vh">
        <Filter {...obj} />

        {item?.isLoading ? (
          <Flex
            display={"flex"}
            mt="10px"
            justifyContent={"center"}
            w="100%"
            mx="auto"
          >
            <Spin />
          </Flex>
        ) : (
          <Data {...item} page={pagevalue} setpage = {setpage} />
        )}
      </Flex>
    </div>
  );
};

export default Home;
