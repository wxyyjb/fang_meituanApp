// 标签子组件
<template>
  <div class="tag-box">
    <span
      class="tag-item"
      :class="{ active: currentType == obj.id }"
      v-for="obj in tag"
      :key="obj.id"
      @click="changeTab(obj.id)"
      >
      {{ obj.name }}({{ obj.count }})
      </span
    >
  </div>
</template>


<script>
export default {
  // 接收来自tag组件的参数
  props: ['tag', 'currentType'],
  methods:{
    changeTab(id){
      this.$emit('change',id)
    }
  }
}
</script>


<style lang="scss" scoped>
// 引入处理ios系统下1px边框出现双倍问题样式
@import '@/assets/css/myMixin.scss';
.tag-box {
  padding: 0.3rem 0.28rem 0.1rem;
  .tag-item {
    display: inline-block;
    height: 0.52rem;
    padding: 0 0.24rem;
    margin: 0 0.2rem 0.2rem 0;
    line-height: 0.52rem;
    text-align: center;
    font-size: 0.26rem;
    color: #666;
    @include border-fix(#bbb, 0.52rem);
    &.active {
      @include border-fix(#ffb000, 0.52rem);
      background-color: #fffbf1;
    }
  }
}
</style>