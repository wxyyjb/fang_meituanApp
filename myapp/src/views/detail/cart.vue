<template>
  <div>
    <div class="cart-container">
      <!-- 购物车 -->
      <div class="cart-box" @click="isShow = !isShow">
        <div class="cart-icon" :class="{ active: total }">
          <span class="iconfont icon-gouwuche"></span>
          <span class="num" v-show="total">{{ total }}</span>
        </div>
        <div class="cart-price" :class="{ active: total }">
          <div class="price">{{ totalPrice }}</div>
          <div class="deliver">另需配送费￥{{ seller.fee }}</div>
        </div>
        <div class="cart-buy" :class="{ active: totalPrice > seller.price }">
          {{ buyDesc }}
        </div>
      </div>
      <!-- 添加购物车时的小球 -->
      <div class="ball-box">
        <div v-for="(ball, index) in ballList" :key="index">
          <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
          >
            <div class="ball" v-show="ball.show">
              <div class="inner"></div>
            </div>
          </transition>
        </div>
      </div>
      <!-- 购物车列表 -->
      <transition name="fade">
        <div class="cart-list-box" v-show="isShow && total">
          <div class="title">
            <span @click="clearCart()">清空购物车</span>
          </div>
          <ul class="list-box">
            <li class="list" v-for="prod in selectList" :key="prod.id">
              <span class="name">{{ prod.name }}</span>
              <span class="price">￥{{ prod.price }}</span>
              <add-cart :type="prod.type" :index="prod.index"></add-cart>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="isShow && total" @click="isShow = !isShow"></div>
  </div>
</template>


<script>
import { mapGetters, mapState } from 'vuex'
import addCart from '@/components/add-cart'
export default {
  components: {
    addCart,
  },
  data() {
    return {
      isShow: false,
    }
  },
  computed: {
    ...mapGetters('product', ['totalPrice', 'total', 'selectList']),
    ...mapState('ball', ['ballList']),
    buyDesc() {
      if (this.totalPrice == 0) {
        return `￥${this.seller.price}起送`
      } else if (this.totalPrice < this.seller.price) {
        return `还差￥${this.seller.price - this.totalPrice}起送`
      } else {
        return '去结算'
      }
    },
  },
  props: ['seller'],
  methods: {
    // 过渡动画
    beforeEnter(el) {
      for (let i = 0; i < this.ballList.length; i++) {
        let ball = this.ballList[i]
        if (ball.show) {
          let pos = ball.el.getBoundingClientRect()
          //  距离顶部的距离
          let y = window.innerHeight - pos.top - 23
          //  距离左边的距离
          let x = pos.left - 30
          el.display = ''
          // 垂直移动
          el.style.transform = `translate3d(0,${-y}px,0)`
          let inner = el.getElementsByClassName('inner')[0]
          //  水平移动
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    enter(el, done) {
      // 重绘
      el.offsetWidth
      this.$nextTick(() => {
        el.style.transform = `translate3d(0,0,0)`
        let inner = el.getElementsByClassName('inner')[0]
        inner.style.transform = `translate3d(0,0,0)`
        el.addEventListener('transitioned', done)
      })
    },
    afterEnter(el) {
      el.style.display = 'none'
      // 释放小球
      this.$store.commit('ball/removeBall')
    },
    // 清空购物车
    clearCart() {
      this.$store.commit('product/clearCartList')
    },
  },
}
</script>


<style lang="scss" scoped>
.cart-container {
  z-index: 100;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 50px;
  width: 100%;
  background: #3b3b3c;
  .cart-box {
    display: flex;
    .cart-icon {
      position: absolute;
      top: -10px;
      left: 10px;
      width: 50px;
      height: 50px;
      line-height: 50px;
      background: #656565;
      border-radius: 50%;
      text-align: center;
      background: #3b3b3c;
      .num {
        position: absolute;
        right: 0;
        top: 0;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #fb4e44;
        color: #fff;
        border-radius: 50%;
        transform: scale(0.5) translate(50%, -50%);
      }
      .icon-gouwuche {
        font-size: 28px;
        color: #c4c4c4;
      }
      &.active {
        background: #f8c74e;
        .icon-gouwuche {
          color: #333;
        }
      }
    }
    .cart-price {
      flex: 1;
      padding-left: 70px;
      color: #999;
      background: #3b3b3c;
      .price {
        display: none;
      }
      .deliver {
        line-height: 50px;
        font-size: 14px;
      }
      &.active {
        .price {
          display: block;
          font-size: 24px;
          color: #fff;
          line-height: 33px;
        }
        .deliver {
          font-size: 11px;
          line-height: 16px;
        }
      }
    }
    .cart-buy {
      width: 108px;
      color: #999;
      font-size: 14px;
      font-weight: 700;
      line-height: 50px;
      text-align: center;
      &.active {
        background: #f8c74e;
        color: #333;
        font-size: 18px;
        font-weight: 400;
      }
    }
  }
  .ball-box {
    .ball {
      position: fixed;
      left: 30px;
      bottom: 23px;
      transition: all 0.4s cubic-bezier(0.48, -0.28, 0.73, 0.42);
      .inner {
        width: 16px;
        height: 16px;
        background: #00a0d3;
        border-radius: 50%;
        transition: all 0.4s linear;
      }
    }
  }
  .cart-list-box {
    position: absolute;
    left: 0;
    bottom: 50px;
    width: 100%;
    background: #fff;
    border-top: 1px solid #e4e4e4;
    z-index: -1;
    .title {
      height: 30px;
      padding: 0 10px;
      line-height: 30px;
      text-align: center;
      font-size: 12px;
      background: #f4f4f4;
      color: #2c3e50;
    }
    .list-box {
      padding: 0 10px;
      .list {
        display: flex;
        padding: 14px 0;
        border-bottom: 1px solid #e4e4e4;
        .name {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .price {
          color: #fb4e44;
          padding: 0 25px;
        }
      }
    }
  }
  .fade-enter {
    transform: translateY(100%);
  }
  .fade-enter-active {
    transition: transform ease 200ms;
  }
  .fade-enter-to {
    transform: translateY(0);
  }
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(7, 17, 27, 0.6);
  // 毛玻璃效果
  backdrop-filter: blur(10px);
  z-index: 50;
}
</style>