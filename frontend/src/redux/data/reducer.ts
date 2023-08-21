import { ItemActionSchema, stateSchema } from "../../Utils";
import { DATA, DATAERROR, DATALOADING } from "./actionType";

const init = {
    isLoading:false, 
    isError:false,
    data:[]
}

export function reducer (state:stateSchema=init, action:ItemActionSchema){
    switch(action.type){
        case DATALOADING:
            return {...state, isLoading:true}
        case DATAERROR:
            return {...state, isLoading:false, isError:true}
        case DATA:
            if('payload' in action){
                return {...state, isLoading:false, isError:false, data:action.payload}
            }else return state;
        default:
            return state
    }
}