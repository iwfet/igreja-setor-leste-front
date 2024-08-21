import BaseHttp from "@/api/http.ts";


class UsuarioHttpService extends BaseHttp {
  constructor() {
    super('/usuarios');
  }

  public getUserInfo() {
    return this.get('/info');
  }
}

export const UsuarioService =   new UsuarioHttpService();
