<template>
  <div class="home">
    <div ref="homebg"
         class="bg"></div>
    <header>
      <div class="top-text">一小时达</div>
      <div class="top-nav">
        <ul>
          <li :class="['item',navIndex==index?'active':'']"
              v-for="(item,index) in navList"
              :key="index"
              @click="toKind(item,index)">{{item.name}}</li>
        </ul>
      </div>
    </header>
    <main class="homeScroll">
      <div>
        <mt-swipe class="scrollBox"
                  :auto="4000">
          <mt-swipe-item v-for="(item,index) in swiperImg"
                         :key="index">
            <img v-lazy="item"
                 alt="">
          </mt-swipe-item>
        </mt-swipe>
        <ul class="foods">
          <li v-for="(item,index) in mainInfo"
              :key="index">
            <div @click="toDetails(item)"
                 class="left">
              <img v-lazy="item.img"
                   alt>
            </div>
            <div class="right">
              <div @click="toDetails(item)"
                   class="text">
                <h3 class="title">{{item.title}}</h3>
                <p class="content">{{item.content}}</p>
                <div>
                  <p class="price">
                    ￥
                    <span class="price-number">{{item.price}}</span>
                  </p>
                </div>
              </div>
              <div class="btn">
                <i @click="del(item.id,index)"
                   class="addBtn min">-</i>
                <span ref="inputText"
                      class="inputText">{{item.num}}</span>
                <i @click="add(item.id,index)"
                   class="addBtn add">+</i>
              </div>
            </div>
          </li>
        </ul>
        <div>
          <p>没有更多商品啦，敬请期待!!!</p>
        </div>
      </div>
    </main>
    <router-view></router-view>
  </div>
</template>

<script>
import $ from "jquery";
import BScroll from "better-scroll";
import { constants } from 'crypto';
export default {
  data () {
    return {
      navList: [
        { name: "全部" },
        { name: "水果", kind: 1 },
        { name: "蔬菜", kind: 2 },
        { name: "肉蛋", kind: 3 },
        { name: "速冻", kind: 4 },
        { name: "酒饮", kind: 5 },
        { name: "乳品", kind: 6 },
        { name: "零食", kind: 7 }
      ],
      navIndex: 0,
      mainInfo: [],
      swiperImg: [
        '/static/imgs/nav/1.jpg',
        '/static/imgs/nav/2.jpg',
        '/static/imgs/nav/3.jpg',
        '/static/imgs/nav/4.jpg'
      ]
    };
  },
  methods: {
    toDetails (item) {
      this.state = !this.state
      this.$router.push({ name: 'details', params: { Info: item } })
    },
    getInfo () {
      this.$axios.get("/goods.json").then(res => {
        this.$store.state.foodInfo = res
        this.getData()
      });
    },
    getData (k) {
      this.mainInfo = [];
      if (!k) {
        this.mainInfo = this.$store.state.foodInfo;
        this.$refs.homebg.style.backgroundImage = `url('/static/imgs/bg/${0}.jpg')`
      } else {
        this.$store.state.foodInfo.filter((item, index, array) => {
          if (item.kind == k) {
            this.mainInfo.push(item);
          }
        });
        this.$refs.homebg.style.backgroundImage = `url('/static/imgs/bg/${k}.jpg')`
      }
    },
    getNum () {
      let arr = this.$store.state.info
      for (let i = 0; i < this.mainInfo.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (arr[j].id == this.mainInfo[i].id) {
            this.mainInfo[i].num = arr[j].num
          }
        }
      }
    },
    toKind (item, index) {
      this.navIndex = index;
      this.getData(item.kind);
      this.getNum()
    },
    add (_id, _ind) {
      this.$store.commit("addInfo", _id);
      let arr = this.$store.state.info
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].id == _id) {
          this.$refs.inputText[_ind].innerHTML = arr[index].num
        }
      }
    },
    del (_id, _ind) {
      if (this.$refs.inputText[_ind].innerHTML == 1) {
        this.$refs.inputText[_ind].innerHTML = 0;
        this.$store.commit("moveInfo", _id);
      } else {
        this.$store.commit("delInfo", _id);
        let arr = this.$store.state.info
        for (let index = 0; index < arr.length; index++) {
          if (arr[index].id == _id) {
            this.$refs.inputText[_ind].innerHTML = arr[index].num
          }
        }
      }
    }
  },
  mounted () {
    this.getInfo();
    let navBS = new BScroll(".top-nav", { click: true, scrollX: true });
    let homeBS = new BScroll(".homeScroll", { click: true });
  },
  beforeUpdate (to, from, next) {
    this.getNum()
    next
  }
};
</script>
<style lang="less" scoped="scoped">
@import '~style/index';
.home {
  font-weight: bold;
  .bg {
    position: fixed;
    .top(0);
    .bottom(0);
    z-index: -1;
    width: 100%;
    height: 100%;
    background-image: url('/static/imgs/bg/0.jpg');
    background-size: cover;
    filter: blur(3px);
  }

  position: fixed;
  .top(0);
  .bottom(0);
  .f_s(14);
  text-align: center;
  width: 100%;
  .padding(0,0,65,0);
  header {
    width: 100%;

    z-index: 999;
    .top-text {
      .h(45);
      .l_h(45);
    }
    .top-nav {
      width: 100%;
      .h(39);

      border: 1px solid #dcdfe6;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
      overflow: hidden;
      ul {
        border-bottom: 1px solid #e4e7ed;
        .h(39);
        display: flex;
        justify-content: space-around;
        width: 200%;
        .item {
          flex: 1;
          .h(40);
          box-sizing: border-box;
          .l_h(40);
          display: inline-block;
          list-style: none;
          .f_s(14);
          font-weight: 500;
          color: #303133;
          position: relative;
        }
        .active {
          color: #ff65af;

          border-right-color: #dcdfe6;
          border-left-color: #dcdfe6;
        }
      }
    }
  }
  main {
    overflow: hidden;
    .w(375);
    .h(583);
    .padding(0,0,60,0);
    div {
      .scrollBox {
        .w(375);
        .h(180);
        img {
          .w(375);
          .h(180);
        }
      }
      .foods {
        width: 100%;
        list-style: none;
        li {
          display: flex;
          .h(130);
          width: 100%;
          .f_s(0);
          border-bottom: 1px solid #e4e7ed;
          background-color: rgba(255, 255, 255, 0.8);
          background-size: 100%;
          .left {
            display: flex;
            justify-content: center;
            .f_s(14);
            vertical-align: middle;
            width: 40%;
            height: 100%;
            img {
              height: 80%;
              transform: translateY(10%);
            }
          }
          .right {
            .f_s(14);
            display: inline-block;
            vertical-align: middle;
            box-sizing: border-box;
            position: relative;
            height: 100%;
            width: 60%;
            text-align: left;
            .padding(0,0,0,10);
            .text {
              position: absolute;
              .l_h(30);
              top: 50%;
              transform: translateY(-50%);
              .title {
                font-style: italic;
                color: red;
              }
              .content {
                .w(200);
                .h(30);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .price-number {
                color: #ff65af;
                .f_s(18);
                font-weight: 600;
              }
            }
            .btn {
              .padding(75,0,0,0);
              position: absolute;
              .bottom(5);
              .right(10);
              display: flex;

              .addBtn {
                font-weight: 400;
                padding: 0;
                border-radius: 50%;
                .w(20);
                .h(20);
                .l_h(20);
                background: #2be2e8;
                text-align: center;
                color: #ffffff;
                .f_s(18);
                border: 0;
              }
              .inputText {
                display: inline-block;
                background: rgba(0, 0, 0, 0);
                .w(20);
                .l_h(20);
                text-align: center;
                border: none;
              }
            }
          }
        }
      }
      div {
        .h(100px);
        p {
          .h(40);
          .l_h(40);
        }
      }
    }
  }
}
</style>
