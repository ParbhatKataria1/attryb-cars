
export interface SessionSchema {
    username:string, 
    email:string
}

export interface ReactNodeSchema {
    children:React.ReactNode
}

export interface OemSchema{
    id:string,
    model:string,
    price:Number,
    color:String[],
    mileage:Number,
    year:Number,
    power:Number,
    speed:Number
}

export interface InventorySchema{
    _id:string,
    title:string,
    image:string,
    scratches:Number,
    odometer:Number,
    registration_place:string,
    original_paint:string,
    description:String[],
    reported_accident:Number,
    previous_buyer:Number,
    user:string,
    oem_spec:string,
    oem:OemSchema[]
}
export interface ItemLoadingSchema {
    type:string,
}

export interface ItemErrorSchema{
    type:string
}

export interface ItemDataSchema{
    type:string,
    payload:InventorySchema[]
}

export interface FetchParamSchema{
    color:string,
    max_mileage:Number, 
    min_mileage:Number, 
    max_price:Number, 
    min_price:Number,
    page:Number, 
    limit:String,
    Search:String
}

export interface stateSchema{
    isLoading:boolean,
    isError:boolean,
    data:InventorySchema[]
}

export type ItemActionSchema = ItemLoadingSchema | ItemErrorSchema | ItemDataSchema;
