<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailBottomBar from "./childComps/DetailBottomBar";
import DetailSwiper from "./childComps/DetailSwiper.vue";

import { getDetail, getRecommend } from "../../network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailBottomBar,
    DetailSwiper,
  },
  data() {
    return {
      iid: null,
      topImages: [],
    };
  },
  created() {
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      console.log(res);
      this.topImages = res.result.itemInfo.topImages
    })
  }
};
</script>

<style scoped>
</style>
