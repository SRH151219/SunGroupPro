<template>
  <div class="details">
    <header>
      <div class="back">
        <p @click="back">back</p>
      </div>
      <h3>商品详情</h3>
    </header>
    <main  class="detailsScroll">
      <div>
         <div class="food-img">
        <img :src="data.img" alt="">
      </div>
      <div class="food-card">
        <h3>{{data.title}}</h3>
        <p>下面是{{data.title}}的商品详细介绍</p>
       <div><span>￥<span class="food-price">{{data.price}}</span></span></div> 
      </div>
      <div class="food-intruction">
        <p>{{data.content}}</p>
      </div>
      </div>
    </main>
    <!-- <footer>
      <div class="btn">
        <input @click="del(data.id)" class="Btn min" type="button" value="-">
        <input ref="inputText" class="Btn" :value="num">
        <input @click="add(data.id)" class="Btn add" type="button" value="+">
      </div>
      <div class="toCar">
          <button @click="toCar">去购物车</button>
      </div>
    </footer> -->
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { constants } from 'crypto';
export default {
  data(){
    return{
      data:[],
      num:0
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
			this.$store.commit("changeShowFooter",true)
    },
    toCar(){
      this.$router.push('/shopCar')
			this.$store.commit("changeShowFooter",true)
    },
    add(id) {
      this.$store.commit("addInfo", id);
	 this.$refs.inputText.value++
    },
    del(id) {
      if (this.$refs.inputText.value <=0) {
        this.$refs.inputText.value = 0;
      } else {
        this.$store.commit("delInfo", id);
        this.$refs.inputText.value--
	  }
    },
    getNum(){
      let arr=this.$store.state.info
      for (let index = 0; index < arr.length; index++) { 
        if(arr[index].id==this.data.id){
          this.num=arr[index].num
        }  
      }
    }
  },
  mounted(){
    this.data=this.$route.params.Info
    this.getNum()
    let detailsBS=new BScroll('.detailsScroll')
  }
}
</script>
<style lang="less" scoped="scoped">
@import "~style/index";
.details{
 position: fixed;
  .top(0);
  .bottom(0);
  .f_s(14);
  text-align: center;
  width: 100%;
    height: 100%;
    z-index: 1001;
    background-color: #fff;
    header{
      .w(375);
    text-align: center;
    .h(50);
    border-bottom: 1px solid #eee;
    .l_h(50);
    .back{
      display: block;
    position: absolute;
    .top(0);
    .left(5);
    }
    }
    main{
      background: #fff;
      padding-bottom: 60px; 
      overflow: hidden;
      .w(375);
      .h(567);
      .food-img{
        display: flex;
        justify-content: center;
          img{
            .w(200);
            .h(200)
          }
      }
      .food-card{
            border: 1px solid #eee;
    .margin(0,10,0,10);
    .l_h(40);
    .food-price{
      color: #ff65af;
    }
      }
      .food-intruction{
        .margin(30,40,80,40);
    border: 1px solid #eee;
    .padding(20,10,50,10);
    .l_h(20);
    p{
      .f_s(16);
      .l_h(32)
    }

      }
    }
    /* footer{
    .w(375);
    height: 50px;
    border-top: 1px solid #eee;
    background-color: #fff;
    font-size: 0;
    display: flex;
    .btn{
width: 50%;
padding-top:10px; 
.Btn{
  width: 30px;
  height: 30px;
  display: inline;
  border:none;
  text-align: center;
  color: #ff65af;
}
    }
    .toCar{
      float: right;
      width: 50%;
      button{
        width: 100%;
    background-color: #ff65af;
      border: none;   
    border-radius: 0;
    height: 50px;
      }
    }
    } */
}
</style>
