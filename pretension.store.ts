import {ActionContext} from 'vuex';
import Vue from 'vue';
import {IAppState} from '@/interfaces/app-state.interface';
import {pretensionWorkResources} from '@/Pretension/resources/pretension-work.resourse';
import {pretensionAuthResources} from '@/Pretension/resources/pretension-auth.resourse';
import {pretensionMediatorResources} from '@/Pretension/resources/pretension-work-mediator.resourse';
import { IPretensionState } from '@/Pretension/interfaces/state.interface';
type DialogActionContext = ActionContext<IPretensionState, IAppState>;

export default{
  namespaced: true,
  state: {
    messageList: [],
    countMessage: 0,
    token: '',
    chatList: [],
    selectedTab: null,
    selectedCorpId: null,
  },
  mutations: {

    setPropertyInStore(state: IPretensionState, {name, value}: { name: string, value: any}) {
      Vue.set(state, name, value);
    },
  },

  actions: {

   async getAllMessageList({rootState, commit, state}: DialogActionContext) {
     try {
       let response: any;
       if (rootState.auth.corpId === 161) {
           response = await pretensionMediatorResources.getMessageList(rootState.auth.token, state.selectedCorpId);
       } else {
           response = await pretensionWorkResources.getMessageList(rootState.auth.token, 161);
       }
       commit('setPropertyInStore', { name: 'messageList', value: response.data.result});
     }
     catch (error) {
       console.error(error);
     }
    },

   async sendMessage({state, rootState, commit }: DialogActionContext, message) {
      const params = {
        corp_id: 161,
        message: message,
        token: rootState.auth.token,
      };
     try {
       let response: any;
       let messageListRefresh: any = state.messageList;
       if (rootState.auth.corpId === 161) {
           response = await pretensionMediatorResources.sendMessage(params);
       } else {
           response = await pretensionWorkResources.sendMessage(params);
       }
         messageListRefresh.messages.push(response.data.result.message);
         commit('setPropertyInStore', { name: 'messageList', value: messageListRefresh});
     }
     catch (error) {
       console.error(error);
     }
   },
          // @todo: authorization in the new api
    async login({ rootState, commit }: DialogActionContext) {
      try {
        const response: any = await pretensionAuthResources.login();
        commit('setPropertyInStore', {name: 'token', value: response.data.result.token});
      }
      catch (error) {
        console.error(error);
      }
    },

    async getNewMessageCount({rootState,commit}: DialogActionContext) {
     try {
       const response: any = await pretensionWorkResources.getNewMessageCount(rootState.auth.token);
       commit('setPropertyInStore', { name: 'countMessage', value: response.data.result.count});
     }
     catch (error) {
       console.error(error);
     }
    },

    async getChatList({rootState, state, commit}: DialogActionContext) {
     try{
       const response: any = await pretensionMediatorResources.getChatList(rootState.auth.token);
       let chatList = response.data.result.chats.map(item => {
           return {...item, active: false}
       });
       commit('setPropertyInStore', { name: 'chatList', value: chatList});
     }
     catch (error) {
       console.log(error);
     }
    },

    async makeAsRead({rootState, commit, state}: DialogActionContext) {
        //Taking all messages of the tab, and choisen only unread messages, and creating new array for request
        const unreadMessages = state.messageList.messages.filter(item => !item.read).map(item => {
            return item.id;
        });

        try {
            let response: any;
            if (rootState.auth.corpId === 161) {
                response = await pretensionMediatorResources.makeAsRead(rootState.auth.token, unreadMessages);
            } else {
                response = await pretensionWorkResources.makeAsRead(rootState.auth.token, unreadMessages);
            }
        }
        catch (error) {
            console.error(error);
        }
    },
  },
};
