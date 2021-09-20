<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control"
                :titles="['流行','新款','精选']" 
                @tabClick="tabclick"
                ref="tabControl2"
                v-show="isTabFixed">
    </tab-control>              
    <scroll class="content" ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      >
      <div>
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']" 
                      @tabClick="tabclick"
                      ref="tabControl1">
        </tab-control>
        <goods-list :goods="showGoods"></goods-list>
        
      </div>
    </scroll>
    <!-- 不能直接监听组件  -->
    <!-- click.native -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar"
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "../home/childComps/FeatureView"
import TabControl from "../../components/content/tabControl/TabControl"
import GoodsList from "../../components/content/goods/GoodsList"
import Scroll from "../../components/common/scroll/Scroll"
import BackTop from "../../components/content/backtop/BackTop"

import { getHomeMultiData, BANNER, RECOMMEND, getGoods} from "../../network/home"
import { BACKTOP_DISTANCE } from "../../common/const"
import { debounce } from "../../common/util"

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
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
      currentType: 'pop',
      isShowBackTop: false,
      isTabFixed: false,
      tabOffsetTop: 0
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
  mounted() {
    //不能传'refresh()' 不能加括号 
    const refresh = debounce(this.$refs.scroll.refresh)
    // const refresh = this.$refs.scroll.refresh
    // 监听item中图片加载完成
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
    //吸顶效果
    // console.log(this.$refs.tabControl.$el.offsetTop)
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
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        //结束上拉加载更多
        this.$refs.scroll.finishPullUp()
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
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    contentScroll(position) {
      // console.log(position);
      this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.refresh()
    },
    swiperImageLoad() {
      //通过$el获取组件内元素的offsetTop值
      // console.log(this.$refs.tabControl1.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
    }
  }

}
</script>

<style scoped>
.home{
  height: 100vh;
  position: relative;
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
  
  height: calc(100% - 88px);
  position: absolute;
  top: 44px;
  bottom: 44px;
  left: 0;
  right: 0;
  overflow: hidden;
  /* overflow-y: scroll; */
}
.tab-control{
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>
