import axios, {AxiosResponse} from "axios";
import { DATA, DATAERROR, DATALOADING } from "./actionType";
import { AllDataSchema,  ItemDataSchema, ItemErrorSchema, ItemLoadingSchema } from "../../Utils";
import { AppDispatch } from "../store";
const apiUrlBack = import.meta.env.VITE_BACKEND_URL;

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

export function create_data(payload:AllDataSchema):ItemDataSchema{
    return {
        type:DATA,
        payload
    }
}

export const fetch_data = (params:any, token:string):any=>async(dispatch:AppDispatch)=>{
    try {
        dispatch(create_loading());
        const data:AxiosResponse<AllDataSchema> = await axios.get(`${apiUrlBack}/inventory`,{headers:{Authorization:token},
            params
        })
        dispatch(create_data(data.data))
    } catch (error) {
        dispatch(create_error());
    }
}

