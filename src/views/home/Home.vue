<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <div>
      <home-swiper :banners="banners"></home-swiper>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar"
import HomeSwiper from "./childComps/HomeSwiper"

import { getHomeMultiData, BANNER, RECOMMEND} from "../../network/home"

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper
  },
  
  data() {
    return {
      banners: []
    }
  },
  created(){
    this.getMultiData()
  },
  methods: {
    getMultiData () {
      getHomeMultiData().then(res => {
        console.log(res);
        this.banners = res.data[BANNER].list
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
