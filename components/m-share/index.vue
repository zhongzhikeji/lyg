<template>
  <!-- 遮罩层 -->
  <u-popup @close="close" v-model="show" mode="bottom" border-radius="30" height="260rpx">

    <view class="share-title">
      <span>分享至</span>
    </view>
    <view class="share-list">
      <!-- #ifdef MP-WEIXIN -->
      <view class="share-item">
        <button class="share-btn" @click="weChatShare" open-type="share">
          <u-icon color="#04BE02" size="80" name="weixin-fill"></u-icon>微信好友
        </button>
      </view>
      <!-- #endif -->
      <!-- #ifdef APP-PLUS -->
      <view class="share-item" @click="handleShare(item)" v-for="(item, index) in list" :key="index">
        <u-icon :color="item.color" size="80" :name="item.icon"></u-icon>
        <view>{{ item.title }}</view>
      </view>
      <!-- #endif -->
      <!-- #ifdef H5 -->  
      <view class="share-item" @click="copyLink()">
        <u-icon color="#b4aee8" size="80" name="share-fill"></u-icon>
        <view>{{ '复制链接' }}</view>
      </view>
      <!-- #endif -->
    </view>
  </u-popup>
</template>
<script>
import { h5Copy } from "@/js_sdk/h5-copy/h5-copy.js";
import configs from "@/config/config";
import mpShare from "uview-ui/libs/mixin/mpShare.js";

export default {
  mixins: [mpShare],
  data() {
    return {
      configs,
      show: true,
      list: [
        {
          color: "#04BE02",
          title: "微信好友",
          icon: "weixin-fill",
          type: 0,
        },
        {
          color: "#04BE02",
          title: "朋友圈",
          icon: "weixin-circle-fill",
          type: 1,
        },
      ],
    };
  },
  // 图片缩略图、 商品名称 、 type（goods,shop,pintuan) 拼团商品分享以及店铺分享

  props: ["thumbnail", "goodsName", "type", "goodsId", "link"],
  methods: {
    close() {
      this.$emit("close");
    },
    weChatShare(){
      this.$u.mpShare = {
        title:  this.shareTitle(), // 默认为小程序名称，可自定义
        path: '', // 默认为当前页面路径，一般无需修改，QQ小程序不支持
        // 分享图标，路径可以是本地文件路径、代码包文件路径或者网络图片路径。
        // 支持PNG及JPG，默认为当前页面的截图
        imageUrl: this.thumbnail ||''
      }
    },

    // h5复制链接
    // #ifdef H5
    copyLink() {
      let content;
      if (this.link) {
        content = this.configs.shareLink + this.link;
      } else {
        content =
          this.configs.shareLink +
          getCurrentPages()[getCurrentPages().length - 1].__page__.fullPath;
      }
      this.$options.filters.setClipboard(content)
    },
    // #endif

    shareTitle() {
      let shareTitle;
      if (this.type == "goods") {
        shareTitle = `[好友推荐]${this.goodsName}快来跟我一起看看吧`;
      } else if (this.type == "shops") {
        shareTitle = `[好友发现]${this.goodsName}快来跟我一起看看吧`;
      } else if (this.type == "pintuan") {
        shareTitle = `[好友邀请]${this.goodsName}快来跟我一起抢购吧!`;
      } else if (this.type == "kanjia") {
        shareTitle = `[好友邀请]请快来帮我砍一刀${this.goodsName}`;
      }
      return shareTitle;
    },

    // #ifdef APP-PLUS
    handleShare(val) {
      console.log("12312312")
      if (val.type <= 1) {
        let scene; //  "WXSenceTimeline 朋友圈   WXSceneSession 微信好友"
        val.type == 1
          ? (scene = "WXSenceTimeline")
          : (scene = "WXSceneSession");
        uni.share({
          provider: "weixin",
          scene: scene,
          href: configs.shareLink + this.link,
          imageUrl: this.thumbnail,
          type: 0,
          summary: this.goodsName,
          title: this.shareTitle(),
          success: function (res) {
            uni.showToast({
              title: "分享成功!",
              duration: 2000,
              icon: "none",
            });
            this.$emit("close");
          },
          fail: function (err) {
            uni.showToast({
              title: "分享失败!",
              duration: 2000,
              icon: "none",
            });
            this.$emit("close");
          },
        });
      }
    },
    // #endif
  },
};
</script>
<style lang="scss" scoped>
@import "./mp-share.scss";
.share-title {
  position: relative;
  height: 90rpx;
  font-size: 32rpx;
  line-height: 90rpx;
  text-align: center;
  > .share-close {
    position: absolute;
    right: 0;
    right: 20rpx;
    top: 30rpx;
  }
}
button:after {
  border: none;
}

.share-list {
  padding: 0 32rpx;
  display: flex;
  text-align: center;
  align-items: center;
  > .share-item {
    width: 25%;
    font-size: 24rpx;
    color: #666;
    > * {
      margin: 8rpx 0;
    }
  }
}
</style>