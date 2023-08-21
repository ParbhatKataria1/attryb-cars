import axios, {AxiosResponse} from "axios";
import { DATA, DATAERROR, DATALOADING } from "./actionType";
import { FetchParamSchema, InventorySchema, ItemDataSchema, ItemErrorSchema, ItemLoadingSchema } from "../../Utils";
import { AppDispatch } from "../store";

export function create_loading():ItemLoadingSchema{
    return {
        type:DATALOADING
    }
}

export function create_error():ItemErrorSchema{
    return {
        type:DATAERROR
    }
}

export function create_data(payload:InventorySchema[]):ItemDataSchema{
    return {
        type:DATA,
        payload
    }
}

export const fetch_data = (params:FetchParamSchema):any=>async(dispatch:AppDispatch)=>{
    try {
        dispatch(create_loading());
        const data:AxiosResponse<InventorySchema[]> = await axios.get(`${process.env.REACT_APP_URL}/inventory`, {
            params
        })
        dispatch(create_data(data.data))
    } catch (error) {
        dispatch(create_error());
    }
}

