<template>
  <div>
    <nav-bar class="detail-nav" @click="backClick">
      <div slot="left" class="back">
        <img src="../../../assets/images/common/back.svg" alt="" />
      </div>
      <div class="title" slot="center">
        <div class="title-item" 
            v-for="(item, index) in titles" 
            :key="index"
            :class="{active: index === currentIndex}"
            @click="titleClick(index)">
            {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar";

export default {
  name: "Detail",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    backClick() {
      this.$router.back()
    },
    titleClick(index) {
      this.currentIndex = index
    }
  }
};
</script>

<style scoped>
.detail-nav {
  background-color: #fff;
  font-weight: normal;
}
.back img{
  margin-top: 12px;
}
.title {
  display: flex;
  padding: 0 20px;
  font-size: 14px;
}
.title-item {
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
</style>
