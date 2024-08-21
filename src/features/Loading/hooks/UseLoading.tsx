
import {useContext} from "react";
import {LoadingContext, LoadingContextProps} from "@/features/Loading/LoadingContext.tsx";


export const useLoading = (): LoadingContextProps => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a Loading");
  }
  return context;
};
