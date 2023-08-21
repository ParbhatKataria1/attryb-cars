import { useEffect } from "react";
import {  stateSchema } from "../Utils";
import { UseAppDispatch, UseAppSelector } from "../redux/store";
import { fetch_data } from "../redux/data/action";
import { Spinner } from "@chakra-ui/react";
import Data from "../Components/Data";
import Spin from "../Components/spin";

const Home = () => {
  const item: stateSchema = UseAppSelector((store) => store.item);
  const dispatch = UseAppDispatch();
  useEffect(() => {
    if (!item?.data?.length) {
      dispatch(fetch_data({}));
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
