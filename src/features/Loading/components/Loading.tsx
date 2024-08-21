import {FC, ReactNode} from 'react';
import {useLoading} from "@/features/Loading";


export const LoadingGlobal: FC<{ children: ReactNode }> = ({children}) => {
  const {loadingExec} = useLoading();
  return (
    <>
      {loadingExec && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}
      <div className={`transition-opacity ${loadingExec ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
};


