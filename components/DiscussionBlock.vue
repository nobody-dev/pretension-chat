<template>
  <div class="discussion-block-wrap">
    <ul class="discussion-block-list" ref="messagesList">
      <li v-for="mess in messageList.messages"
          :key="mess.id"
          class="discussion-block-list-item"
          :class="{
            'discussion-block-list-item--left' : mess.by_mediator == 1,
            'discussion-block-list-item--right' : mess.by_mediator == 0
          }">
        <span class="discussion-block-list-item-content">
         <span class="discussion-block-list-item-content-message-wrap">
           <i class="discussion-block-list-item-content__name">{{messageList.name}}</i>
           <p class="discussion-block-list-item-content__message">{{mess.message}}</p>
         </span>
          <span class="discussion-block-list-item-content__date">{{mess.created_at | convertDateITime}}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Pretension } from '@/Pretension/interfaces/pretension.interface';

  @Component
  export default class DiscussionBlock extends Vue {
    mounted() {
        //Scroll chat to the end after loading
        const { messagesList }: any = this.$refs;
        messagesList.scrollTop = messagesList.scrollHeight - messagesList.clientHeight;
    }

    get messageList(): Pretension.IMessageList {
      return this.$store.state.pretension.messageList;
    }
  }
</script>

<style lang="scss">
  .discussion-block-wrap{
    border-bottom: 1px solid rgba(47, 128, 237, 0.5);
    .discussion-block-list{
      list-style: none;
      margin-bottom: 0;
      padding-left: 14px;
      padding-right: 30px;
      overflow-y: scroll;
      height: 350px;
      &-item{
        margin-bottom: 45px;
        &-content{
          display: flex;
          align-items: flex-start;
          &-message-wrap{
            max-width: 420px;
          }
          &__name{
            font-weight: 500;
            font-size: 11px;
            line-height: 13px;
            color: rgba(79, 81, 98, 0.3);
            font-style: normal;
            width: 100%;
            display: flex;
            padding-bottom: 5px;
          }
          &__message{
            margin: 0;
            font-size: 12px;
            line-height: 14px;
            color: #FFFFFF;
            font-weight: 400;
            border-top-left-radius: 0;
              padding: 19px 15px 12px 19px;
          }
          &__date{
            font-weight: 500;
            font-size: 13px;
            line-height: 15px;
            color: rgba(79, 81, 98, 0.3);
          }
        }
        &--left{
          .discussion-block-list-item-content__message{
            background: linear-gradient(107.19deg, #4A49CA 15.77%, #2F80ED 77.54%);
            border-radius: 20px;
            border-top-left-radius: 0;
          }
          .discussion-block-list-item-content{
            margin-right: auto;
          }
          .discussion-block-list-item-content__name{
            justify-content: flex-start;
          }
          .discussion-block-list-item-content__date{
            margin-left: 20px;
          }
        }
        &--right{
          .discussion-block-list-item-content__message{
              background: #E4EBF6;
              border-radius: 20px;
              border-top-right-radius: 0;
              color: #606266;
          }
          .discussion-block-list-item-content{
            margin-left: auto;
            flex-direction: row-reverse;
          }
          .discussion-block-list-item-content__name{
            justify-content: flex-end;
          }
          .discussion-block-list-item-content__date{
            margin-right: 20px;
          }
        }
      }
      &::-webkit-scrollbar {
        width: 12px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgba(#487bce, 0.2);
        border-radius: 10px;
        border: 3px #fff solid;

        &:hover {
          background-color: rgba(#487bce, 0.8);
        }
      }
    }
  }
</style>
