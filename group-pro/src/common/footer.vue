<template>
	<div>
		<ul>
			<router-link to="/home">
				<li>首页</li>
			</router-link>
			<router-link to="/shopCar">
				<li >购物车</li>
			</router-link>
			<router-link to="/my">
				<li>我的</li>
			</router-link>
			
		</ul>
	</div>
</template>

<script>
</script>

<style lang="less" scoped="scoped">
	@import "~style/index";
	ul{
		.w(375);
		.h(60);
		display: flex;
		justify-content: space-around;
		text-align: center;
		.l_h(60);
		a{
			flex:1;
			color: black;
		}
	}
</style>
