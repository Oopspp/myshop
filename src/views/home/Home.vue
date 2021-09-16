<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <div>
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar"
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"

import { getHomeMultiData, BANNER, RECOMMEND} from "../../network/home"

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created(){
    this.getMultiData()
  },
  methods: {
    getMultiData () {
      //获取轮播图、推荐内容数据
      getHomeMultiData().then(res => {
        console.log(res);
        this.banners = res.data[BANNER].list,
        this.recommends = res.data[RECOMMEND].list
      })
    }
  }

}
</script>

<style scoped>
.home{
  height: 100vh;
}
.home-nav{
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
</style>
