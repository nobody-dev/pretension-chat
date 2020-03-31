import { Pretension } from '@/Pretension/interfaces/pretension.interface';

export interface IPretensionState {
  chatList: any;
  selectedCorpId: number;
  messageList: Pretension.IMessageList;
  countMessage: number;
  token: string;
}
