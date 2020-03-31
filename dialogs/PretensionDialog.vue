<template>
  <el-dialog
      :visible="isShow"
      :close-on-press-escape="true"
      :before-close="onClose"
      class="pretension-dialog"
  >
  <div class="pretension-dialog-wrap">
    <div class="pretension-block-discussion-wrap">
      <div class="pretension-block-discussion-wrap__title">
         <h2>Обсуждения</h2>
      </div>
      <div class="pretension-block-discussion-wrap-content">
        <DiscussionBlock/>
      </div>
      <div class="pretension-block-discussion-wrap-footer">
        <SendMessage/>
      </div>
    </div>
    <div class="pretension-user-block">
      <UsersBlock/>
    </div>
  </div>
  </el-dialog>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

  import DiscussionBlock from '@/Pretension/components/DiscussionBlock.vue';
  import SendMessage from '@/Pretension/components/SendMessage.vue';
  import UsersBlock from '@/Pretension/components/UsersBlock.vue';

  @Component({
    components: {
      DiscussionBlock,
      SendMessage,
      UsersBlock
    },
  })

  export default class PretensionWork extends Vue {

    get isShow() {
      return this.$store.state.dialog.allPages.pretensionDialog;
    }

    async mounted() {
      await this.$store.dispatch('pretension/login');
      // обновление сообщений в претензиях
      setTimeout(() => {
        this.$store.dispatch('pretension/getNewMessageCount');
        this.$store.dispatch('pretension/getChatList');
        // this.$store.dispatch('pretension/getAllMessageList');
      },100);

      setInterval(() => {
        this.$store.dispatch('pretension/getNewMessageCount');
        this.$store.dispatch('pretension/getChatList');
        // this.$store.dispatch('pretension/getAllMessageList');
      },7000)
    }

    onClose() {
      this.$store.commit('dialog/closeDialog', { blockName: 'allPages', dialogName: 'pretensionDialog'});
    }
  }
</script>

<style lang="scss">
  .pretension-dialog-wrap{
    width: 915px;
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 9999;
    top: 50%;
    transform: translate(0,-50%);
    border: 0.5px solid #C4C4C4;
    box-sizing: border-box;
    border-radius: 4px;
  }
  .pretension-dialog-wrap{
    display: flex;
  }
  .pretension-block-discussion-wrap{
    flex-basis: 65%;
    border-right: 1px solid #DFE6F1;
    &__title{
      height: 70px;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #DFE6F1;
      h2{
        color: #444444;
        font-weight: 500;
        font-size: 15px;
      }
    }
    &-content{
      height: 350px;
    }
    &-footer{
      height: 100px;
    }
  }
  .pretension-user-block{
    flex-basis: 35%;
  }
  .pretension-dialog{
    .el-dialog__header{
      display: none!important;
    }
    .el-dialog__body{
      padding: 0 !important;
    }
  }

</style>
