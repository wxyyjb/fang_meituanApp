// 详情页组件
<template>
  <div class="scrollBox">
    <div>
      <sellerHeader :seller="seller"></sellerHeader>
      <van-tabs v-model="active" sticky animated color="#ffda41">
        <van-tab title="菜单">
          <order></order>
        </van-tab>
        <van-tab title="评价">
          <comment></comment>
        </van-tab>
        <van-tab title="商家">
          <seller :seller="seller"></seller>
        </van-tab>
      </van-tabs>
    </div>
    <cart :seller="seller"></cart>
  </div>
</template>
<script>
import { getStoreById } from '@/api/detail'
import sellerHeader from './sellerHeader'
import order from './order'
import BScroll from '@better-scroll/core'
import cart from './cart'
import comment from './../comment'
import seller from './../seller'
export default {
  data() {
    return {
      seller: [],
      active: 0,
      scrollBox: null,
    }
  },
  components: {
    sellerHeader,
    order,
    cart,
    comment,
    seller
  },
  methods: {
    // 获取商家详情
    getStoreMsg() {
      getStoreById({ id: this.$route.query.id }).then((res) => {
        this.seller = res.data
      })
    },
  },
  created() {
    this.getStoreMsg()
  },
  mounted() {
    this.scrollBox = new BScroll('.scrollBox', {
      bounce: false,
      click:true
    })
  },
}
</script>
<style lang="scss" scoped>
.scrollBox {
  height: 100vh;
}
</style>