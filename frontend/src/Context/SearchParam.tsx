import { createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AllParamSchema } from "../Utils";



export const ParamContext = createContext<AllParamSchema | null>(null);

export function ParamContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [params, setparams] = useSearchParams();

  let param: any = {};
  param.pagevalue = params.get("pagevalue") || 1;
  param.limit = params.get("limit") || 6;
  param.min_price = params.get("min_price") || 0;
  param.max_price = params.get("max_price") || 5000000;
  param.min_mileage = params.get("min_mileage") || 0;
  param.max_mileage = params.get("max_mileage") || 50;
  param.color = params.getAll("color") || [];
  param.search = params.get("search") || "";

  const [priceRange, setpriceRange] = useState<number[]>([
    param.min_price,
    param.max_price,
  ]);
  const [mileageRange, setmileageRange] = useState<number[]>([
    param.min_mileage,
    param.max_mileage,
  ]);
  const [pagevalue, setpage] = useState(param.pagevalue);
  const [color, setcolor] = useState<string[]>(param.color || []);
  const [search, setsearch] = useState(param.search);

  return (
    <ParamContext.Provider
      value={{
        setparams,
        params,
        param,
        priceRange,
        setpriceRange,
        mileageRange,
        setmileageRange,
        pagevalue,
        setpage,
        color,
        setcolor,
        search,
        setsearch,
      }}
    >
      {children}
    </ParamContext.Provider>
  );
}
