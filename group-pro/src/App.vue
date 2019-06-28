<template>
  <div id="app">
    <router-view/>
		<Footer class="footer"></Footer>
  </div>
</template>
<script>
	import Footer from "./common/footer.vue"
	export default({
		components:{
			Footer
		}
	})
</script>
<style lang="less">
	@import "~style/index";
	.footer{
		position: fixed;
		bottom: 0;
		left: 0
	}
</style>
