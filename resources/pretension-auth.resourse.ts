import axios, { AxiosResponse } from 'axios';
import { PretensionResource } from '@/Pretension/interfaces/pretension-resource.interface';

class PretensionAuthResources {
  apiUrl = `${process.env.VUE_APP_PRETENSION_AUTH}user`;
  headers = {
    'X-api-sign': process.env.VUE_APP_API_SIGN,
    'X-api-name': `bb`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  data = {
    jsonrpc: '2.0',
    id: 1,
  };

  login(): Promise<AxiosResponse<PretensionResource.IResponse<PretensionResource.ILoginResult>>> {
    return axios.post(
        this.apiUrl,
        {
          ...this.data,
          method: PretensionResource.Method.LOGIN,
          params: {
            email: "admin_1@yopmail.com",
            password: "987654"
          },
        },
        {
          headers: {
            ...this.headers,
          },
        }) as Promise<AxiosResponse<PretensionResource.IResponse<PretensionResource.ILoginResult>>>;
  }
}
export const pretensionAuthResources =  new PretensionAuthResources();
