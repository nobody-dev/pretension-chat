export namespace Pretension {
  export interface IMessageList {
    map: any;
    filter: any;
    messages: IMessageListItem[];
    name: string;
    total: number;
  }

  export interface IMessageListItem {
    by_mediator: string;
    corp_id: string;
    created_at: string;
    id: number;
    message: string;
    read: string;
    updated_at: string;
    user_id: string;
  }
}
