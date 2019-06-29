<template>
	<div id="app">
		<router-view/>
		<Footer class="footer"></Footer>
	</div>
</template>
<script>
import Footer from "./common/footer.vue"
export default ({
	components: {
		Footer
	}
})
</script>
<style lang="less">
@import '~style/index';
#app {
  width: 100%;
  height: 100%;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
}
</style>
