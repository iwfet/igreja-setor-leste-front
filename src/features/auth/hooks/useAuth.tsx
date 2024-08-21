import {AuthContext, AuthContextProps} from "@/features/auth";
import {useContext} from "react";


export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
