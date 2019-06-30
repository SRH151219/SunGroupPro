<template>
  <div id="my">
    <div class="head">
      <div class="set">
        <span @click="handleGoSet"
              class="iconfont ">&#xe612;</span>
      </div>
      <div class="con">
        <div class="pic">
          <img :src="userImg"
               alt="">
        </div>
        <div class="info">
          <p>昵称:
            <span>{{userName}}</span>
          </p>
          <p>性别:
            <span>{{userSex}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="two">
        <ul>
          <li>
            <span>115</span>
            <b>收藏夹</b>
          </li>
          <li>
            <span>72</span>
            <b>关注店铺</b>
          </li>
          <li>
            <span>774</span>
            <b>足迹</b>
          </li>
          <li>
            <span>15</span>
            <b>红包卡券</b>
          </li>
        </ul>
      </div>
      <div class="content">
        <div class="one">
          <p>我的订单</p>
          <p>查看全部订单&gt;</p>
        </div>
        <ul>
          <li @click="obligation">
            <span class="iconfont iconicon">
            </span>
						<div class="obligation" v-if="show">
							{{goodsNum}}
						</div>
            <b>待付款</b>
          </li>
          <li>
            <span class="iconfont icondaifahuo1">

            </span>
            <b>代发货</b>
          </li>
          <li>
            <span class="iconfont icondaifahuo
">
            </span>
            <b>待收货</b>
          </li>
          <li>
            <span class="iconfont iconicon-test">

            </span>
            <b>待付款</b>
          </li>
          <li>
            <span class="iconfont iconpingjia
">
            </span>
            <b>评价</b>
          </li>
          <li>
            <span class="iconfont iconrefund">

            </span>
            <b>退款/售后</b>
          </li>
        </ul>
      </div>
      <div class="guss">
        <div class="name">
          猜你喜欢：
        </div>
        <div class="con">
          还没有数据哦
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import myLocalStorage from 'utils/myStorage'

export default {
  data () {
    return {
      userImg: '',
      userSex: '',
      userName: '',
			goodsNum:"",
			show:false
    }
  },
  created () {
    this.getInfo()
		this.showGoodsSum()
  },
  methods: {
		showGoodsSum(){
			this.$store.commit("showGoodsNum")
			this.goodsNum=this.$store.state.goodsNum
			if(this.goodsNum!=0){
				this.show=true
			}else{
				this.show=false
			}
		},
    handleGoSet () {
      this.$router.push('/userset')
    },
    getToken () {
      return myLocalStorage.get('userToken')
    },
    getInfo () {
      let token = this.getToken()
      if (token) {
        let { userImg, userSex, username } = myLocalStorage.get('userInfo')
        this.userImg = userImg
        this.userSex = userSex
        this.userName = username
      } else {
        this.$router.push('/login')
      }
    },
		obligation(){
			this.$router.push("/pay")
		}
  }
}
</script>

<style scoped lang='less'>
@import '~style/index';
#my {
  .w(375);
  position: fixed;
  top: 0;

  .bottom(60);
  background: #ccc;
  overflow: hidden;
  font-size: 16px;
  overflow: scroll;
  .head {
    .w(375);
    .h(180);
    .padding(0, 14 ,0 ,14);
    background: linear-gradient(-90deg, #fa4dbe, #fbaa58);
    .set {
      width: 100%;
      .h(50);
      span {
        .w(50);
        .h(50);
        .l_h(50);
        font-size: 24px;
        text-align: center;
        background: rgba(255, 174, 174, 0.2);
        border-radius: 5px;
        float: right;
      }
    }
    .con {
      .pic {
        .w(80);
        .h(80);
        box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        background: #fff;
        float: left;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .info {
        float: left;
        .w(200);
        .h(100);
        .padding(20,10,20,10);
        p {
          font-size: @font-size-m;
          width: 100%;
          text-align: left;
          .padding(0,0,10,30);
          color: #333;
          .l_h(20);
          span {
            color: #fff;
            font-weight: 900;
            padding-left: 10px;
          }
        }
      }
    }
  }
  .bottom {
    .padding(0,15,0,15);
    .two {
      font-size: @font-size-m;
      background: linear-gradient(-90deg, #fa4dbe, #fbaa58);
      border-radius: 10px;
      .margin(20,0,0,0);
      .padding(10,15,10,15);
      ul {
        display: flex;
        justify-content: space-between;
        color: #fff;
        font-weight: 700;
        li {
          display: flex;
          flex-direction: column;
          align-items: center;
          b {
            .padding(10,0,0,0);
          }
        }
      }
    }
    .content {
      font-size: @font-size-m;
      border-radius: 20px;
      background: #fff;
      .margin(10,0,0,0);
      .one {
        .padding(10,15,10,15);
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgb(221, 214, 214);
        p:nth-of-type(1) {
          font-size: @font-size-l;
          font-weight: 900;
          color: #000;
        }
      }
      ul {
        display: flex;
        justify-content: space-between;
        .padding(10,10,10,10);
        li {
          display: flex;
          flex-direction: column;
          align-items: center;
					position: relative;
          span {
            font-size: 24px;
            color: #c33;
          }
					.obligation{
						.w(20);
						.h(20);
						.l_h(20);
						text-align: center;
						background: #c33;
						position: absolute;
						.top(-5);
						.right(0);
						border-radius: 50%;
					}
          b {
            font-size: 14px;
            .padding(10,0,0,0);
            color: #333;
          }
        }
      }
    }
    .guss {
      padding: 0 15px;
      font-size: @font-size-m;
      border-radius: 10px;
      background: #fff;
      margin-top: 10px;
      .name {
        padding: 10px 5px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgb(221, 214, 214);
        font-weight: 600;
        font-size: 18px;
      }
      .con {
        .h(400);
        width: 100%;
        background: rgba(250, 245, 245, 0.3);
        font-size: 30px;
        text-align: center;
        .l_h(300);
        color: #c33;
        writing-mode: tb-rl;
        letter-spacing: 10px;
      }
    }
  }
}
</style>
