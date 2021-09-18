<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <div class="content">
      <div>
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']" 
                      @tabClick="tabclick"
                      ref="tabControl"
          >
        </tab-control>
        <goods-list :goods="showGoods"></goods-list>
        <!-- <ul>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
          <li>消息</li>
        </ul> -->
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar"
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "../home/childComps/FeatureView"
import TabControl from "../../components/content/tabControl/TabControl"
import GoodsList from "../../components/content/goods/GoodsList"

import { getHomeMultiData, BANNER, RECOMMEND, getGoods} from "../../network/home"

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList
  },
  
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop'
    }
  },
  created(){
    this.getMultiData()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  computed: {
    //获取首页该类型商品数据
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     * 网络请求相关
     */
    //外面封装一层函数到 created
    getMultiData () {
      //获取轮播图、推荐内容数据
      getHomeMultiData().then(res => {
        // console.log(res);
        this.banners = res.data[BANNER].list,
        this.recommends = res.data[RECOMMEND].list
      })
    },
    getHomeGoods(type) {
      //默认获取第一页数据
      const page = this.goods[type].page + 1
      getGoods(type, page).then(res => {
        console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    },
    /**
     * 事件监听相关
     */
    tabclick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl.currentIndex = index
    }
  }

}
</script>

<style scoped>
.home{
  height: 100vh;
  /* padding-top: 44px; */
}
.home-nav{
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.content{
  
  /* height: calc(100% - 88px); */
  position: absolute;
  top: 44px;
  bottom: 44px;
  left: 0;
  right: 0;
  overflow: hidden;
  overflow-y: scroll;
}
.tab-control{
  position: sticky;
  top: 0;
  z-index: 9;
}
</style>
