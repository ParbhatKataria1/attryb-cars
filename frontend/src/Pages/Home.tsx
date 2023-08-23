import { useEffect,  useContext } from "react";
import {  stateSchema } from "../Utils";
import { UseAppDispatch, UseAppSelector } from "../redux/store";
import { fetch_data } from "../redux/data/action";
import Data from "../Components/Data";
import Spin from "../Components/Spin";
import {  Flex, useToast } from "@chakra-ui/react";
import Filter from "../Components/Filter";
import { debounce } from "../functionUtils";
import { ParamContext } from "../Context/SearchParam";

const Home = () => {
  const item: stateSchema = UseAppSelector((store) => store.item);
  const Toast = useToast();
  const dispatch = UseAppDispatch();
  const {
    setparams,
    priceRange,
    setpriceRange,
    mileageRange,
    setmileageRange,
    pagevalue,
    color,
    setcolor,
    search,
    setsearch,
  } =   useContext<any>(ParamContext)

  const obj = {
    priceRange,
    setpriceRange: debounce(setpriceRange, 300),
    mileageRange,
    setmileageRange: debounce(setmileageRange, 300),
    color,
    setcolor,
    search,
    setsearch,
  };

  const token: string = JSON.parse(
    sessionStorage.getItem("login_cred") || ""
  )?.token;
  useEffect(() => {
    let obj: any = {
      page: pagevalue,
      color,
      min_price: priceRange[0],
      max_price: priceRange[1],
      min_mileage: mileageRange[0],
      max_mileage: mileageRange[1],
      search,
    };
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

  return (
    <Flex h="90vh">
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
        <Data {...item}  />
      )}
    </Flex>
  );
};

export default Home;
