import {Pretension} from '@/Pretension/interfaces/pretension.interface';

export namespace PretensionResource {
  export enum Method {
    GET_MESSAGE_LIST = 'index',
    CHECK_NEW_MESSAGE = 'hasNew',
    SEND_MESSAGE = 'send',
    MAKE_AS_READ = 'makeAsRead',
    GET_COUNT_MESSAGE = 'countNews',
    GET_CHAT_LIST = 'chats',
    LOGIN = 'login',
  }

  export interface IResponse<T> {
    id: number;
    jsonrpc: string;
    result: T;
  }

  export interface IParamsSendMessage {
    corp_id?: number;
    message: string;
    token: string;
  }

  export interface ISendMessageResult {
    message: Pretension.IMessageListItem;
  }

  export interface IGetCountResult {
    count: number;
  }

  export interface ILoginResult {
    token: string;
  }
}
