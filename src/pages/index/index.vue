<template>
  <view class="content">
    <view class="page-container">
      <swiper
        class="swiper"
        indicator-dots="ture"
        autoplay="true"
        duration="500"
        interval="2000"
      >
        <swiper-item
          class="swiper-item"
          v-for="item in bannerList"
          :key="item.id"
        >
          <image class="banner-preview-image" :src="item.imagePath"></image>
        </swiper-item>
      </swiper>
    </view>
    <view>
      <van-tabs v-model="active">
        <van-tab title="热门博文">
          <scroll-view class="scroll-view">
            <view class="list-card" v-for="item in articleList" :key="item.id">
              {{ item.title }}
            </view>
          </scroll-view>
        </van-tab>
        <van-tab title="热门项目">
          <scroll-view>
            <view class="list-card" v-for="item in projectList" :key="item.id">
              <view class="item-header-container">
                <view class="card-title">
                  {{ item.title }}
                </view>
                <view class="card-image-group">
                  <image class="card-image" :src="item.envelopePic"></image>
                </view>
              </view>
            </view>
          </scroll-view>
        </van-tab>
      </van-tabs>
    </view>
  </view>
</template>
	

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      active: 1,
      bannerList: [],
      articleList: [],
      projectList: []
    };
  },
  onLoad() {
    this.loaderBanner();
    this.listLoader();
  },
  computed: {},
  methods: {
    loaderBanner() {
      uni.request({
        url: "https://wanandroid.com/banner/json",
        success: res => {
          this.bannerList = res.data.data;
        }
      });
    },
    listLoader() {
      uni.request({
        url: "https://www.wanandroid.com/article/list/0/json",
        success: res => {
          this.articleList = res.data.data.datas;
        }
      });
      uni.request({
        url: "https://www.wanandroid.com/project/list/1/json",
        success: res => {
          this.projectList = res.data.data.datas;
        }
      });
    }
  }
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fafafa;
}
.swiper {
  height: 300rpx;
}
.swiper-item {
  width: 100%;
  height: 100%;
}
.banner-preview-image {
  width: 100%;
  height: 100%;
}
.scroll-view {
  height: 100%;
}
.list-card {
  padding: 10rpx;
  margin-left: 40rpx;
  margin-right: 40rpx;
  margin-top: 40rpx;
  border-radius: 20rpx;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  height: 150rpx;
  box-shadow: 2rpx 2rpx 3rpx #cccccc;
}
.item-header-container {
  display: flex;
  flex-direction: row;
  height: 150rpx;
}
.card-title {
  flex-grow: 1;
  padding: 5rpx 10rpx 0 10rpx;
}
.card-image-group {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.card-image {
  width: 120rpx;
  height: 140rpx;
}
</style>
