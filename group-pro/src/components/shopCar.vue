<template>
	<div class="shopCar">
		<h3>
			我的购物车
		</h3>
		<div class="content-empty"
		     v-if="show">
			<div class="empty-box">
				你还没有添加任何商品哦！
			</div>
		</div>
		<div class="content"
		     v-else>
			55555
		</div>
	</div>
</template>

<script>
export default ({
	data () {
		return {
			show: false
		}
	}
})
</script>

<style lang="less" scoped="scoped">
@import '~style/index';
.shopCar {
  .w(375);
  position: fixed;
  .top(0);
  .bottom(60);
  .left(0);
  h3 {
    .w(375);
    .h(40);
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    text-align: center;
    .l_h(40);
  }
  .content,
  .content-empty {
    .w(375);
    position: fixed;
    .top(40);
    .bottom(60);
    background: gray;
    .empty-box {
      .w(375);
      .h(40);
      position: absolute;
      top: 50%;
      text-align: center;
    }
  }
}
</style>
