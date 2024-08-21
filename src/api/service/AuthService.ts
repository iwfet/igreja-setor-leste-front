import BaseHttp from "@/api/http.ts";


class AuthHttpService  extends BaseHttp {
  constructor() {
    super("/auth");
  }

  public async login(email: string, password: string): Promise<any> {
    return this.post('/login', { email, password });
  }
}

export const AuthService  =   new AuthHttpService ();
