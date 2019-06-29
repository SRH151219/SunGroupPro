<template>
  <div class="home">
    <header>
      <div class="top-text">一小时达</div>
      <div class="top-nav">
        <ul>
          <li
            :class="['item',navIndex==index?'active':'']"
            v-for="(item,index) in navList"
            :key="index"
            @click="toKind(item,index)"
          >{{item.name}}</li>
        </ul>
      </div>
    </header>
    <main class="homeScroll">
      <div>
        <ul class="foods">
          <li v-for="(item,index) in mainInfo" :key="index">
            <div @click="toDetails(item)"  class="left">
              <img :src="item.img" alt>
            </div>
            <div class="right">
              <div @click="toDetails(item)" class="text">
                <h3 class="title">{{item.title}}</h3>
                <p class="coontent">{{item.content}}</p>
                <div>
                  <p class="price">
                    ￥
                    <span class="price-number">{{item.price}}</span>
                  </p>
                </div>
              </div>
              <div class="btn">
                <input @click="del(item.id,index)" class="addBtn min" type="button" value="-">
                <input ref="inputText" class="inputText" :value="item.num">
                <input @click="add(item.id,index)" class="addBtn add" type="button" value="+">
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
  data() {
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
	  mainInfo: []
    };
  },
  methods: {
	  toDetails(item){
		 this.state=!this.state
		  this.$router.push({name:'details',params:{Info:item}})
	  },
    getInfo() {
      this.$axios.get("/goods.json").then(res => {
		   this.$store.state.foodInfo=res
		   this.getData()
      });
	},
	getData(k){
		this.mainInfo = [];
		if (!k) {
          this.mainInfo = this.$store.state.foodInfo;
        } else {
          this.$store.state.foodInfo.filter((item, index, array) => {
            if (item.kind == k) {
              this.mainInfo.push(item);
            }
          });
		}
      
	},
	getNum(){
		let arr=this.$store.state.info
      for (let i = 0; i < this.mainInfo.length; i++) {
		  for (let j = 0; j < arr.length; j++) { 
				if(arr[j].id==this.mainInfo[i].id){
				this.mainInfo[i].num=arr[j].num
				}  
			}  
	  }
	},
    toKind(item, index) {
	  this.navIndex = index;
	  this.getData(item.kind);
	  this.getNum()
    },
    add(_id,_ind) {
	  this.$store.commit("addInfo", _id);
	  let arr=this.$store.state.info
		for (let index = 0; index < arr.length; index++) { 
			if(arr[index].id==_id){
				this.$refs.inputText[_ind].value=arr[index].num
			}  
    	  } 
    },
    del(_id,_ind) {
			if(this.$refs.inputText[_ind].value==1){
				 this.$refs.inputText[_ind].value = 0;
				this.$store.commit("moveInfo", _id);	
			}else {
		this.$store.commit("delInfo", _id);
		let arr=this.$store.state.info
        for (let index = 0; index < arr.length; index++) { 
			if(arr[index].id==_id){
				this.$refs.inputText[_ind].value=arr[index].num
			}  
    	  } 
	  }
    }
  },
  mounted(){
	this.getInfo();
   let navBS= new BScroll(".top-nav", {click: true, scrollX: true });
    let homeBS= new BScroll(".homeScroll", {click: true});
  },
  beforeUpdate(to,from,next){
    console.log('守卫')
    this.getNum()
    next
  }
};
</script>
<style lang="less" scoped="scoped">
@import "~style/index";
.home {
	position:fixed;
	top: 0;
	bottom: 0;
  font-size: 14px;
  text-align: center;
  width: 100%;
  padding-bottom: 65px;
  header {
    width: 100%;
    background-color: #fff;
    z-index: 999;
    .top-text {
      height: 45px;
      line-height: 45px;
    }
    .top-nav {
      width: 375px;
      height: 39px;
      background: #fff;
      border: 1px solid #dcdfe6;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
      overflow: hidden;
      ul {
        background-color: #f5f7fa;
        border-bottom: 1px solid #e4e7ed;
        height: 39px;
        display: flex;
        justify-content: space-around;
        width: 200%;
        .item {
          flex: 1;
          height: 40px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          line-height: 40px;
          display: inline-block;
          list-style: none;
          font-size: 14px;
          font-weight: 500;
          color: #303133;
          position: relative;
        }
        .active {
          color: #409eff;
          background-color: #fff;
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
    div {
      .foods {
        width: 100%;
        list-style: none;
        padding: 0;
        li {
			display: flex;
          height: 130px;
          width: 100%;
          font-size: 0;
          border-bottom: 1px solid #e4e7ed;
          background-color: #fff;
          .left {
			  display: flex;
			  justify-content: center;
            font-size: 14px;
            
            vertical-align: middle;
            width: 40%;
            height: 100%;
            img {
              height: 80%;
              transform: translateY(10%);
            }
          }
          .right {
            font-size: 14px;
            display: inline-block;
            vertical-align: middle;
            box-sizing: border-box;
            position: relative;
            height: 100%;
            width: 60%;
            text-align: left;
            padding-left: 10px;
            .text {
              position: absolute;
              line-height: 30px;
              top: 50%;
              transform: translateY(-50%);
              .price-number {
                color: #ff65af;
                font-size: 18px;
                font-weight: 600;
              }
            }
            .btn {
              position: absolute;
              bottom: 5px;
			  right: 10px;
              .addBtn {
                width: 20px;
                color: #ff65af;
                font-size: 18px;
                border: 0;
              }
              .inputText {
                display: inline-block;
                width: 20px;
                text-align: center;
                border: none;
              }
            }
          }
        }
      }
      div {
        p {
          height: 40px;
          line-height: 40px;
        }
      }
    }
  }
}
</style>