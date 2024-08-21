import React from "react";

export interface AuthState {
  nomeUsuario: string | null;
  telasPermisao: Screen[];
}

export interface Screen {
  tela_id: number;
  nome_tela: string;
  descricao: string;
  path: string;
}

export interface AuthContextProps extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => boolean;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
