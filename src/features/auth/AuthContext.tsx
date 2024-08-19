import {createContext, FC, useEffect, useState} from 'react';
import {AuthContextProps, AuthProviderProps, AuthState} from "@/features/auth/types";
import {useLoading} from "@/features/Loading";
import {removeToken, updateToken} from "@/utils";
import {toast } from 'react-toastify';
import {AuthService, UsuarioService} from "@/api";



export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<AuthProviderProps> = ({children}) => {
  const [authState, setAuthState] = useState<AuthState>({
    nomeUsuario: null,
    telasPermisao: [],
  });
  const {setLoading} = useLoading();

  useEffect(() => {
    getUserInfo().then(() => null);

  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password);
      const {access_token, telasPermisao, nomeUsuario} = response;
      updateToken(access_token);

      setAuthState({
        nomeUsuario,
        telasPermisao ,
      });

      toast.success('Login successful!');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during login. Please check your credentials.');
    }
  };

  const logout = () => {
    setAuthState({
      nomeUsuario: null,
      telasPermisao: [],
    });
    removeToken();
    toast.success('Logout successful!');
  };

  const getUserInfo = async () => {
    setLoading(true);
    try {
      const response = await UsuarioService.getUserInfo();
      // @ts-ignore
      const {telasPermisao, nomeUsuario} = response;
      setAuthState({
        nomeUsuario,
        telasPermisao ,
      });
    } catch (error) {
      console.error(error);
      removeToken()
    } finally {
      setLoading(false);
    }
  };

  const checkAuthStatus = () => true;

  return (
    <AuthContext.Provider value={{...authState, login, logout, checkAuthStatus}}>
      {children}
    </AuthContext.Provider>
  );
};
