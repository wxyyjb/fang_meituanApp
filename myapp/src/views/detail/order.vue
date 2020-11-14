<template>
  <div>
    <div class="order-box">
      <div class="menu-box" ref="menuBox">
        <ul>
          <li
            class="menu-list"
            :class="{ active: currentIndex == index }"
            v-for="(item, index) in prodList"
            :key="index"
            @click="changeMenu(index)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="prod-box" ref="prodBox">
        <ul>
          <li class="cate-list" v-for="(item, typeIndex) in prodList" :key="typeIndex">
            <div class="cate-title">{{ item.name }}</div>
            <ul>
              <li class="prod-list" v-for="(prod,index) in item.content" :key="prod.id">
                <div class="prod-img-box">
                  <img :src="prod.img" alt="" />
                </div>
                <div class="prod-info">
                  <div class="name">{{ prod.name }}</div>
                  <div class="sale">
                    <span class="num">月销 {{ prod.num }}</span>
                    <span>赞 {{ prod.up }}3</span>
                  </div>
                  <div class="price">￥{{ prod.price }}</div>
                </div>
                <div class="add-cart-container">
                  <addCart :type="typeIndex" :index="index"></addCart>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex'
import BScroll from '@better-scroll/core'
import addCart from './../../components/add-cart'
export default {
  data() {
    return {
      menuScroll: null,
      prodScroll: null,
      currentIndex: 0,
      posY: [],
      menuList: [],
      scrollY: 0,
    }
  },
  components:{
    addCart
  },
  computed: {
    ...mapState('product', ['prodList']),
  },
  methods: {
    initScroll() {
      this.menuScroll = new BScroll('.menu-box', {
        bounce: false,
        click: true,
      })
      this.prodScroll = new BScroll('.prod-box', {
        bounce: false,
        probeType: 3,
        click: true
      })
      // 获取右侧分类垂直方向位置
      this.getPosY()
      // 获取左侧列表
      this.menuList = this.$refs.menuBox.getElementsByClassName('menu-list')
      this.prodScroll.on('scroll', (e) => {
        this.scrollY = Math.abs(Math.round(e.y))
      })
    },
    changeMenu(index) {
      let prodList = this.$refs.prodBox.getElementsByClassName('cate-list')
      let el = prodList[index]
      this.prodScroll.scrollToElement(el, 300)
      this.currentIndex = index
    },
    getPosY() {
      let prodList = this.$refs.prodBox.getElementsByClassName('cate-list')
      let y = 0
      for (let i = 0; i < prodList.length; i++) {
        if (i == 0) {
          this.posY.push(y)
        } else {
          let prevEle = prodList[i - 1]
          y += prevEle.offsetHeight
          this.posY.push(y)
        }
      }
    },
  },
  created() {
    this.$store.dispatch('product/getProdList', this.$route.query.id).then(
      // 初始化滚动
      this.$nextTick(() => {
        this.initScroll()
      })
    )
  },
  watch: {
    scrollY(val) {
      for (let i = 0; i < this.posY.length; i++) {
        let pos1 = this.posY[i]
        let pos2 = this.posY[i + 1]
        if (pos1 <= val && pos2 > val) {
          // i是索引
          let el = this.menuList[i]
          this.menuScroll.scrollToElement(el, 300, 0, -100)
          this.currentIndex = i
          break
        }
      }
    },
  },
}
</script>


<style lang="scss" scoped>
.order-box {
  display: flex;
  height: calc(100vh - 44px);
  .menu-box {
    flex: 0 0 1.6rem;
    width: 1.6rem;
    height: calc(100vh - 94px);
    overflow: hidden;
    background: #f5f5f5;
    .menu-list {
      padding: 0.18rem 0.24rem 0.4rem;
      line-height: 0.36rem;
      font-size: 0.26rem;
      color: #2c3250;
      &.active {
        color: red;
      }
    }
  }
  .prod-box {
    flex: 1;
    min-width: 0;
    height: calc(100vh - 94px);
    overflow: hidden;
    background: #fff;
    .cate-list {
      padding: 0 0.2rem;
      .cate-title {
        height: 0.72rem;
        line-height: 0.72rem;
      }
      .prod-list {
        position: relative;
        display: flex;
        margin-bottom: 0.4rem;
        .prod-img-box {
          flex: 0 0 1.5rem;
          width: 1.5rem;
          margin-right: 0.15rem;
          img {
            width: 100%;
          }
        }
        .prod-info {
          flex: 1;
          min-width: 0;
          .name {
            font-size: 0.32rem;
            color: #333;
            font-weight: 700;
            line-height: 0.45rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 0.04rem;
          }
          .sale {
            color: #666;
            font-size: 0.22rem;
            margin-bottom: 0.06rem;
            .num {
              margin-right: 0.2rem;
            }
          }
          .price {
            color: #f00;
            font-size: 0.36rem;
          }
        }
        .add-cart-container {
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
    }
  }
}
</style>