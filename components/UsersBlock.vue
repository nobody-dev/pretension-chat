<template>
<div class="users-block-wrap">
  <div class="search-block">
    <div class="search-block-input-block" :class="{'showInp' : onSearchShow, 'hideInp' : !onSearchShow}">
      <button @click="hideInputSearch" class="search-block-input-block__btn-close"><i class="el-icon-close"></i></button>
        <input  v-model="searchValue" placeholder="Поиск по имени собеседника" class="search-block-input" type="text" name="" id="">
    </div>
      <p class="users-title">
        <span
          :class="{
          'hideTitle' : onSearchShow,
          'showTitle': !onSearchShow
          }">
          Участники</span>
          <i @click="showInputSearch" class="el-icon-search"
             :class="{
              'searchIconShow': onSearchShow,
              'searchIconHide' : !onSearchShow,
             }"
             ></i>
      </p>
  </div>
  <div class="users-list-wrap">
    <ul class="users-list">
      <li v-for="(user,index) in filterUsers" :key="index" :class="{'users-list-active': user.corp_id === selectedCorpId}" @click="selectTabs(user, index)">
        <span>{{user.corp_name}}</span>
        <i v-if="user.unread">
          <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="12" height="8.84848" rx="1.5" fill="#2F80ED" stroke="white"></rect>
            <path d="M6.5 5.80304C6.47115 5.80304 6.39147 5.79075 6.24804 5.72384C6.11039 5.65963 5.94411 5.55939 5.7515 5.4218C5.36626 5.14661 4.91673 4.75178 4.43845 4.28657C3.48396 3.35814 2.46006 2.19386 1.67736 1.26447C1.42584 0.965807 1.62461 0.500016 2.05026 0.500016L10.9498 0.50001C11.3754 0.50001 11.5742 0.965801 11.3226 1.26447C10.5399 2.19386 9.51604 3.35814 8.56155 4.28656C8.08327 4.75178 7.63374 5.14661 7.2485 5.4218C7.05589 5.55939 6.88961 5.65963 6.75196 5.72384C6.60853 5.79075 6.52885 5.80304 6.5 5.80304Z" fill="#2F80ED" stroke="white"></path>
          </svg>
        </i>
      </li>
    </ul>
  </div>
</div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';

  @Component({})
  export default class UsersBlock extends Vue {
    onSearchShow: boolean = false;
    searchValue: string = '';

    async mounted() {
      await this.$store.dispatch('pretension/getChatList');
      this.choiseTab();
    }

    @Watch("users")
    //After refresh data from backend, refresh choising tab, or go choiseTab() logic
    async refreshSelectedTab() {
      if (this.selectedTab !== null) {
        this.users[this.selectedTab].active = true;
        await this.$store.dispatch('pretension/getAllMessageList');
        await this.$store.dispatch('pretension/makeAsRead');
      } else {
        this.choiseTab();
      }
    }

    //If the user has no unread messages, the first tab is selected, otherwise the first of unread messages is selected.
    async choiseTab() {
      if (!this.users.filter(item => item.unread).length) {
        this.$store.commit('pretension/setPropertyInStore', {name: 'selectedCorpId', value: this.users[0].corp_id});
        await this.$store.dispatch('pretension/getAllMessageList');
        await this.$store.dispatch('pretension/makeAsRead');

      } else {
        const unreadMsg = this.filterUsers.find(item => item.unread);
        this.$store.commit('pretension/setPropertyInStore', {name: 'selectedCorpId', value: unreadMsg.corp_id});
        await this.$store.dispatch('pretension/getAllMessageList');
        await this.$store.dispatch('pretension/makeAsRead');
      }
    }

    async selectTabs(tab, index) {
      //Saving selected tab and corp_id for next api requests
      this.$store.commit('pretension/setPropertyInStore', {name: 'selectedTab', value: index});
      this.$store.commit('pretension/setPropertyInStore', {name: 'selectedCorpId', value: tab.corp_id});
      //Load messages of definite corporation when clicking on tab and after it make this messages as read
      await this.$store.dispatch('pretension/getAllMessageList');
      await this.$store.dispatch('pretension/makeAsRead');
    }

    showInputSearch() {
      this.onSearchShow = true;
    }

    hideInputSearch() {
      this.onSearchShow = false;
    }

    get users() {
      return this.$store.state.pretension.chatList;
    }

    get filterUsers() {
      return (this.users as any).filter(item => item.corp_name.toUpperCase().indexOf(this.searchValue.toLocaleUpperCase()) > -1)
    }

    get selectedTab() {
      return this.$store.state.pretension.selectedTab;
    }

    get selectedCorpId() {
      return this.$store.state.pretension.selectedCorpId;
    }

    get corpId() {
      return this.$store.state.auth.corpId;
    }
  }
</script>

<style lang="scss" scoped>

  .searchIconShow {
    transition: 1s;
    transform: translate(180px);
  }
  .searchIconHide {
    transition: 1s;
    transform: translate(0px);
  }
.users-block-wrap {
  overflow-x: hidden;
  .search-block {
    border-bottom: 1px solid #E4EBF6;
    height: 45px;
    position: relative;
    .users-title {
      font-size: 15px;
      display: flex;
      line-height: 18px;
      padding-left: 22px;
      color: #444444;
      margin: 0;
      position: absolute;
      top: 30%;
      width: 88%;
      i {
        margin-left: 10px;
        cursor: pointer;
        position: relative;
        z-index: 1;
        font-size: 12px;
        display: flex;
        align-items: center;
      }
      .hideTitle {
        transform: translate(-150%);
        transition: .5s;
        display: block;
      }
      .showTitle {
        display: block;
        transform: translate(0) ;
        transition: 1s;
      }
    }
    &-input-block {
      width: 100%;
      z-index: -1;
      position: relative;
      display: flex;
      align-items: center;
      height: 100%;
      transition-delay: .5s;
      input {
        border: none;
        flex-basis: 70%;
        font-size: 13px;
        line-height: 15px;
        &::placeholder{
          color: rgba(68, 68, 68, 0.3);
        }
      }
      &__btn-close {
        border: none;
        margin-left: 20px;
        padding: 0;
        margin-right: 16px;
        background-color: transparent;
        cursor: pointer;
        i{
          color: #AFB0B3;
        }
      }
    }
    .showInp {
      opacity: 1;
      z-index: 1;
      transition: 1s;
    }
    .hideInp {
      opacity: 0;
      transition: .4s ease;
      transition-delay: 0s;
    }
  }
  .users-list-wrap {
   .users-list {
     margin: 0;
     list-style-type: none;
     padding-left: 0;
     li {
       height: 45px;
       display: flex;
       align-items: center;
       padding-left: 21px;
       border-bottom:1px solid #E4EBF6;
       font-weight: 500;
       font-size: 15px;
       line-height: 18px;
       color: rgba(68, 68, 68, 0.3);
       cursor: pointer;
       i {
         margin-left: 20px;
       }
     }
     &-active {
       background: #E4EBF6;
       color: #444444 !important;
     }
   }
  }
}
</style>
