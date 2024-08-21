import {createContext, FC, ReactNode, useEffect, useState} from 'react';

export interface LoadingContextProps {
  setLoading: (loading: boolean) => void;
  loadingExec: boolean
}

export const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider: FC<{ children: ReactNode }> = ({children}) => {
  const [loadingExec, setLoadingExec] = useState<boolean>(false);
  const [loadingCount, setLoadingCount] = useState<number>(0);


  const setLoading = (estado: boolean) => {
    if (estado) {
      setLoadingCount((prevCount) => prevCount + 1);
    } else {
      setLoadingCount((prevCount) => Math.max(prevCount - 1, 0));
    }
  };

  useEffect(() => {
    if (loadingCount > 0 !== loadingExec) {
      setLoadingExec(loadingCount > 0);
    }
  }, [loadingCount]);

  return (
    <LoadingContext.Provider value={{setLoading, loadingExec}}>
      {children}
    </LoadingContext.Provider>
  );
};

