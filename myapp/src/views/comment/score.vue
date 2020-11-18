// 评分子组件
<template>
  <div class="score-box">
    <!-- 商家评分 -->
    <div class="seller-score">
      <div class="num">{{score}}</div>
      <div class="desc">商家评分</div>
    </div>
    <!-- 包装评分 -->
    <div class="pack-score">
      <div class="item">
        <span>口味</span>
        <star :score="flavor"></star>
        <span>{{flavor}}</span>
      </div>
      <div class="item">
        <span>包装</span>
        <star :score="packing"></star>
        <span>{{packing}}</span>
      </div>
    </div>
    <!-- 配送评分 -->
    <div class="deliver-score">
      <div class="num">{{delivery}}</div>
      <div class="desc">配送评分</div>
    </div>
  </div>
</template>


<script>
// 引入评分星级组件
import star from '@/components/star'
export default {
  components:{
    star
  },
  // 接收score组件传递过来的值
  props:['delivery','score','packing','flavor']
}
</script>


<style lang="scss" scoped>
.score-box {
  display: flex;
  padding: 0.3rem;
  background-color: #fff;
  .seller-score,.deliver-score {
    flex: 0 0 1.86rem;
    width: 1.86rem;
    text-align: center;
    .num {
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.54rem;
      font-weight: 700;
    }
  }
  .seller-score {
    .num {
      color: #ffb000;
    }
  }
  .deliver-score {
    border-left: 1px solid #ccc;
    .num {
      color: #999;
    }
  }
  .pack-score {
    flex: 1;
    color: #666;
    font-size: 0.26rem;
    .item {
      margin: 0.06rem 0 0.2rem;
    }
  }
}
</style>