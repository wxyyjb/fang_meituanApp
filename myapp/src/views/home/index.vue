<template>
  <div>
    <!-- header部分 -->
      <!-- 吸顶 -->
    <van-sticky :offset-top="0">
      <div class="header">
        <label for="search"><input type="text" class="search" placeholder="请输入商家或商品名称" id="search"></label> 
      </div>
    </van-sticky>
    <category></category>
    <div class="title">附近商家</div>
    <list></list>
  </div>
</template>
<script>
import category from './category'
import list from './list'
export default {
  components: {
    category,
    list
  }
}
</script>
<style lang="scss" scoped>
.header {
  padding: 0.2rem;
  background: #1c1b20;
}
.search {
  box-sizing: border-box;
  width: 100%;
  height: 0.6rem;
  padding: 0 0.2rem;
  border: none;
  line-clamp: 0.6rem;
  border-radius: 0.3rem;
}
.title {
  height: 0.46rem;
  margin: 0.3rem 0 0 0.1rem;
  font-size: 0.34rem;
  text-align: center;
  font-weight: 800;
  line-height: 0.46rem;
}
.title::after,.title::before{
  display: inline-block;
  content: '';
  height: 1px;
  width: 30px;
  transform: scaleY(0.5);
  vertical-align: middle;
  background: #666;
}
</style>
