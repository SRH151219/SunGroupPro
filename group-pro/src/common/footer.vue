<template>
  <div v-if="this.$store.state.showFooter">
    <ul>
      <li>
        <router-link to="/home">
          <span class="iconfont">&#xe61c;</span>
          <span>首页</span>
        </router-link>
      </li>
      <li>
        <router-link to="/shopCar">
          <span class="iconfont">&#xe61b;</span>
          <span>购物车</span>
        </router-link>
      </li>

      <li @click="goMy">
        <router-link to="/my">
          <span class="iconfont">&#xe623;</span>
          <span>我的</span>
        </router-link>
      </li>

    </ul>
  </div>
</template>

<script>
	export default({
		data(){
			return{
				show:true
			}
		},
		methods:{
			goMy(){
				if(localStorage.userToken){
					this.$router.push("/my")
					this.$store.commit("changeShowFooter",true)
				}else{
					this.$router.push("/login")
				}
				
			}
		},
		mounted(){
		}
	})
</script>

<style lang="less" scoped="scoped">
@import '~style/index';
ul {
  .w(375);
  .h(60);
  display: flex;
  justify-content: space-around;
  text-align: center;
  li {
    flex: 1;
  }
  a {
    width: 100%;
    height: 100%;
    color: black;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    span {
      align-self: center;
    }
    span:nth-of-type(1) {
      font-size: 22px;
      margin-bottom: 3px;
    }
  }
  .router-link-active {
    background: @bg-color-red1;
    color: #fff;
  }
}
</style>
