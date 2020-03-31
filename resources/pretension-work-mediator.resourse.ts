import axios, { AxiosResponse } from 'axios';
import { Pretension } from '@/Pretension/interfaces/pretension.interface';
import { PretensionResource } from '@/Pretension/interfaces/pretension-resource.interface';

class PretensionMediatorResources {
  apiUrl = `${process.env.VUE_APP_PRETENSION_PLACEMENT_SERVICE}mediator`;
  headers = {
    'X-api-sign': process.env.VUE_APP_API_SIGN,
    'X-api-name': `bb`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  data = {
    jsonrpc: '2.0',
    id: 1
  };

  getMessageList(token: string, corp_id?: number): Promise<AxiosResponse<PretensionResource.IResponse<Pretension.IMessageList>>> {
    return axios.post(
        this.apiUrl,
        {
          ...this.data,
          method: PretensionResource.Method.GET_MESSAGE_LIST,
          params: {
            filters: {
              corp_id: corp_id,
            },
            per_page: 500,
            page: 1,
          },
        },
        {
          headers: {
            ...this.headers,
            token: token,
          },
        }) as Promise<AxiosResponse<PretensionResource.IResponse<Pretension.IMessageList>>>;
  }

    sendMessage(params: PretensionResource.IParamsSendMessage): Promise<AxiosResponse<PretensionResource.IResponse<PretensionResource.ISendMessageResult>>> {
    return axios.post(
        this.apiUrl,
        {
          ...this.data,
          method: PretensionResource.Method.SEND_MESSAGE,
          params: {
            corp_id: params.corp_id,
            message: params.message,
          },
        },
        {
          headers: {
            ...this.headers,
            token: params.token,
          },
        }) as Promise<AxiosResponse<PretensionResource.IResponse<PretensionResource.ISendMessageResult>>>;
    }

  getChatList(token: string) {
    return axios.post(
        this.apiUrl,
        {
          ...this.data,
          method: PretensionResource.Method.GET_CHAT_LIST,
        },
        {
          headers: {
            ...this.headers,
            Token: token,
          },
        }) as Promise<AxiosResponse<PretensionResource.IResponse<PretensionResource.ISendMessageResult>>>;
  }

    makeAsRead(token: string, messages?: Number[]): Promise<AxiosResponse<PretensionResource.IResponse<Pretension.IMessageList>>> {
        return axios.post(
            this.apiUrl,
            {
                ...this.data,
                method: PretensionResource.Method.MAKE_AS_READ,
                params: {
                    ids: messages,
                },
            },
            {
                headers: {
                    ...this.headers,
                    token: token,
                },
            }) as Promise<AxiosResponse<PretensionResource.IResponse<Pretension.IMessageList>>>;
    }
}
export const pretensionMediatorResources =  new PretensionMediatorResources();
