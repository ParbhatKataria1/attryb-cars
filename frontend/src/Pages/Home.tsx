import { useEffect } from "react";
import {  stateSchema } from "../Utils";
import { UseAppDispatch, UseAppSelector } from "../redux/store";
import { fetch_data } from "../redux/data/action";
import Data from "../Components/Data";
import Spin from "../Components/spin";
import { useToast } from "@chakra-ui/react";

const Home = () => {
  const item: stateSchema = UseAppSelector((store) => store.item);
  const Toast = useToast();
  const dispatch = UseAppDispatch();
  const token:string= JSON.parse(sessionStorage.getItem('login_cred') || "")?.token;
  useEffect(() => {
    if (!item?.data?.length) {
      if(token){
        dispatch(fetch_data({}, token));
      }else {
        Toast({title: "Error", description: "Token is not valid", status: 'error', duration: 4000, isClosable: true,});
      }
    }
  }, []);
  return (
    <div>
      {item?.isLoading ? (
        <Spin/>
      ) : <Data {...item}/>}

    </div>
  );
};

export default Home;
