<template>
  <view class="fragment">
    <van-tree-select
      class="van-tree-select"
      :items="menuList"
      :main-active-index="menuIndex"
      @clickNav="onClickNav"
    >
      <view class="frame-layout" slot="content">
        <view class="detail-list" v-if="starMap[selectId]">
          <view v-for="item in starMap[selectId].datas" :key="item.id">
            {{ item.title }}
          </view>
        </view>
      </view>
    </van-tree-select>
  </view>
</template>
<script>
export default {
  data() {
    return {
      menuIndex: 0,
      selectId: 408,
      menuList: [],
      starMap: {}
    };
  },
  onLoad() {
    console.log("下载menu");
    this.loadMenuList();
    this.loadDetailList();
  },
  methods: {
    async loadMenuList() {
      const menuKey = "star-menu-list";
      let storageMenuJson = await uni.getStorageSync(menuKey);
      if (storageMenuJson) {
        this.menuList = JSON.parse(storageMenuJson);
        console.log("读取公众号列表成功");
      }
      uni.request({
        url: "https://wanandroid.com/wxarticle/chapters/json",
        success: res => {
          let list = res.data.data;
          list.forEach(element => {
            element.text = element.name;
            element.disabled = false;
            element.children = [];
          });
          if (list.length != this.menuList.length) {
            this.menuList = list;
            uni.setStorage({
              key: menuKey,
              data: JSON.stringify(list),
              success: res => {
                console.log("缓存公众号列表成功");
              }
            });
          }
        }
      });
    },
    onClickNav({ detail }) {
      console.log(JSON.stringify(detail));
      let id = this.menuList[detail.index].id;
      this.loadDetailList({ id });
    },
    loadDetailList({ index = 1, id = 408 } = {}) {
      this.selectId = id;
      const url = `https://wanandroid.com/wxarticle/list/${id +
        "/" +
        index}/json`;
      uni.request({
        url: url,
        success: res => {
          this.$set(this.starMap, id, res.data.data);
        }
      });
    }
  }
};
</script>
<style lang="scss">
.fragment {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.van-tree-select {
  height: 100% !important;
  flex-grow: 1;
}
</style>