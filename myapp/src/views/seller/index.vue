// 商家页
<template>
  <div class="seller-box">
    <ul class="list-box">
      <li class="list">
        <span class="iconfont icon-weizhi"></span>
        <span>{{ seller.address }}</span>
      </li>
    </ul>
    <ul class="list-box">
      <li class="list">
        <span class="iconfont icon-peisong1"></span>
        <span>配送服务：{{ seller.server }}</span>
      </li>
      <li class="list">
        <span class="iconfont icon-shijian"></span>
        <span>配送时间：{{ seller.delivery_time }}</span>
      </li>
    </ul>
    <ul class="list-box">
      <li class="list">
        <span class="iconfont icon-fuli"></span>
        <span>{{ seller.full }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['seller'],
}
</script>


<style lang="scss" scoped>
@import '@/assets/css/myMixin.scss';
.seller-box {
  padding: 0 0.3rem;
  .list-box {
    padding-top: 0.36rem;
    @include border-buttom-1px(#ebedf0);
    .list {
      padding-bottom: 0.36rem;
      color: #333;
      line-height: 0.36rem;
      .iconfont {
        margin-right: 0.28rem;
        color: #c0c0c0;
      }
      .icon-fuli {
        color:#f00;
      }
    }
  }
}
</style>