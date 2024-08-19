import BaseHttp from "@/api/http.ts";


class TelasHttpService extends BaseHttp {
  constructor() {
    super('/telas');
  }

  public async buscarTelasAtivas(): Promise<any> {
    return this.get('/ativas') ;
  }
}

export const TelasService =  new TelasHttpService();
