// 评价页
<template>
  <div class="commentBox" ref="commentBox">
    <div>
      <score
        :delivery="comment.delivery"
        :score="comment.score"
        :packing="comment.packing"
        :flavor="comment.flavor"
      ></score>
      <div class="tag-container">
        <tag
          :tag="comment.label"
          :currentType="comment.type"
          @change="change"
        ></tag>
      </div>
      <list :list="comment.rate"></list>
    </div>
  </div>
</template>

<script>
// 引入评价页的评分、标签、列表子组件
import score from './score'
import tag from './tag'
import list from './list'
// 引入商家评论接口
import { getComment } from '@/api/comment'
// 引入滚动组件
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      type: 1, //获取全部
      comment: {},
      commentScroll: null,
    }
  },
  // 注册组件
  components: {
    score,
    tag,
    list,
  },
  methods: {
    // 获取评论数据
    getData() {
      return new Promise((resove) => {
        getComment({ id: this.$route.query.id, type: this.type }).then(
          (res) => {
            this.comment = res.data
            resove()
          }
        )
      })
    },
    change(id) {
      this.type = id
      this.getData()
    },
  },
  created() {
    this.getData().then(() => {
      this.$nextTick(() => {
        this.commentScroll = new BScroll(this.$refs.commentBox, {
          click: true,
          bounce: false,
        })
      })
    })
  },
}
</script>


<style lang="scss" scoped>
.commentBox {
  height: calc(100vh - 44px);
}
.tag-container {
  border-top: 0.2rem solid #ddd;
}
</style>