<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    <!-- <div :class="{ active: isActive }"><slot name="item-text"></slot></div> -->
    <!-- <img src="../../../assets/images/tabbar/home.svg" alt="">
      <div>首页</div> -->
  </div>
  <!-- <div class="tab-bar-item">
      <img src="../../../assets/images/tabbar/home.svg" alt="">
      <div>首页</div>
    </div>
    <div class="tab-bar-item">
      <img src="../../../assets/images/tabbar/category.svg" alt="">
      <div>分类</div>
    </div>
    <div class="tab-bar-item">
      <img src="../../../assets/images/tabbar/shopcart.svg" alt="">
      <div>购物车</div>
    </div>
    <div class="tab-bar-item">
      <img src="../../../assets/images/tabbar/profile.svg" alt="">
      <div>我的</div>
    </div> -->

  <!-- 文件路径过深的配置问 -->
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#FF5777"
    }
  },
  data() {
    return {
      // isActive: true
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
    // this.$router 全部路由 和 this.$route 激活路由
  },
  methods: {
    itemClick() {
      // console.log(this);
      // console.log(111);
      this.$router.replace(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}

</style>