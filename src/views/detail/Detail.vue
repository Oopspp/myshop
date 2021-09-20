<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <div>
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>11</li>
          <li>12</li>
          <li>13</li>
          <li>14</li>
          <li>15</li>
          <li>16</li>
          <li>17</li>
          <li>18</li>
          <li>19</li>
          <li>20</li>
          <li>21</li>
          <li>22</li>
          <li>23</li>
          <li>24</li>
          <li>25</li>
          <li>26</li>
          <li>27</li>
          <li>28</li>
          <li>29</li>
          <li>30</li>
          <li>31</li>
          <li>32</li>
          <li>33</li>
          <li>34</li>
          <li>35</li>
          <li>36</li>
          <li>37</li>
          <li>38</li>
          <li>39</li>
          <li>40</li>
          <li>41</li>
          <li>42</li>
          <li>43</li>
          <li>44</li>
          <li>45</li>
          <li>46</li>
          <li>47</li>
          <li>48</li>
          <li>49</li>
          <li>50</li>
        </ul>
      </div>
    </scroll>

    <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import Scroll from "../../components/common/scroll/Scroll";

import {
  getDetail,
  getRecommend,
  Goods,
  GoodsParam,
  Shop,
} from "../../network/detail";

export default {
  name: "Detail",
  components: {
    Scroll,
    DetailNavBar,
    DetailBaseInfo,
    DetailSwiper,
    DetailShopInfo,
    DetailBottomBar,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    //根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      //获取顶部轮播图数据
      const data = res.result;
      this.topImages = res.result.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },
  methods: {
    contentScroll(position) {},
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  background-color: #fff;
  height: 100vh;
  z-index: 9;
}
.content {
  height: calc(100% - 102px);
  overflow: hidden;
  /* position: absolute;
  top: 44px;
  bottom: 58px;
  left: 0;
  right: 0; */
}
</style>
