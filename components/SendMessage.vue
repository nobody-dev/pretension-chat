<template>
  <div class="input-block-wrap">
    <el-upload
            class="pretension-upload"
            action=""
            list-type="picture"
            ref="upload"
            :on-preview="handlePreview"
            multiple
            :auto-upload="false"
            :limit="99"
            :file-list="uploadFiles">
       <button class="input-block-wrap-btn-add">
         <i class="el-icon-plus"></i>
       </button>
      <el-dialog
              :visible.sync="isShow"
              class="upload-file-dialog"
              center>
          <img :src="fileUrl" alt="Картинка" v-if="fileType === 'image'">
          <span v-else class="upload-file-dialog__no-image">Файл не является изображением.</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click.stop=" isShow = false">Закрыть</el-button>
        </span>
      </el-dialog>
    </el-upload>
    <textarea v-on:keyup.enter="sendMessage"
              placeholder="Ваше сообщение..."
              v-model="messageText"
              class="input-block-wrap__area"
              type="text"></textarea>
    <button class="input-block-wrap-btn-send" @click="sendMessage"><i class="el-icon-top"></i></button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class SendMessage extends Vue {
    messageText: string = '';
    isShow: boolean = false;
    fileUrl: any = '';
    fileType: any = '';
    uploadFiles: any = [];

    async sendMessage() {
      if (this.messageText !== '') {
        await this.$store.dispatch('pretension/sendMessage', this.messageText);
        this.messageText = '';
      }
    }

    handlePreview(file) {
      this.isShow = true;
      this.fileUrl = file.url;
      this.fileType = file.raw.type.substring(0, 5);
    }
  }
</script>

<style lang="scss">

  .input-block-wrap{
    height: 100%;
    display: flex;
    width: 100%;
    align-items: flex-start;
    &__area{
      flex-basis: 76%;
      margin-top: 25px;
      margin-left: 40px;
      resize: none;
      border: none;
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
      height: calc(100% - 30px);
      &::placeholder{
        color: rgba(79, 81, 98, 0.3);
      }
    }
    &-btn-add{
      background: #FFFFFF;
      margin-top: 11px;
      margin-left: 17px;
      border: 1px solid #E4E4E4;
      box-sizing: border-box;
      box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      width: 33px;
      height: 33px;
      cursor: pointer;
      i{
        color: #2F80ED;
        font-size: 20px;
      }
    }
    &-btn-send{
      width: 40px;
      margin-top: 22px;
      margin-right: 25px;
      height: 40px;
      background: #2F80ED;
      border: 1px solid #E4E4E4;
      box-sizing: border-box;
      box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      i{
        color: #fff;
        font-size: 21px;
      }
    }
  .pretension-upload{
    position: relative;
    z-index: 1;
    .el-upload-list {
        margin-top: 9px;
    }
    .el-upload-list--picture {
      position: absolute;
      overflow-y:scroll;
      height: 35px;
      z-index: 99;
      padding-left: 14px !important;
      width: 70px;
      &::-webkit-scrollbar {
        width: 1px;
      }
      .el-upload-list__item{
        padding: 0;
        margin-top: 0 ;
        border: none ;
        height: auto ;
        cursor: pointer;
        .el-upload-list__item-name{
            margin-right: 9px;
            margin-top: 0;
            font-size: 9px;
            text-decoration: underline;
        }
        .el-icon-close {
            top: 1px;
            right: -3px;
        }
        img{
          display: none;
        }
        .el-icon-document{
          display: none;
        }
      }
    }
  }
  .upload-file-dialog{
    z-index: 3000;
    .el-dialog--center{
      margin-top: 0!important;
    }
    .el-dialog__body{
      width: 100%;
      height: 300px;
      overflow: hidden;
      position: relative;
      img{
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 100%;
        height: 100%;
        top: 50%;
        transform: translate(0,-50%);
      }
    }
    &__no-image {
        position: relative;
        top: 10px;
        left: 20px;
    }
  }
}
</style>
