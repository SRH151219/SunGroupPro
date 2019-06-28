<template>
	<div class="pay-wrap">
		<div class="head">
				<i @click="back">&lt;</i>
				填写订单
		</div>
		<div class="scroll-box">
			<div class="min">
				<ul>
					<li v-for="(item,index) in list">
						<img :src="item.img" />
						<p>{{item.num}}</p>
					</li>
				</ul>
				<div class="sum-price">
					<p>合计:<span><i>￥</i>{{price}}</span></p>
				</div>
				<div class="address-box">
					<div class="address">
						地址:<input type="text" readonly="readonly" />
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<p>付款<i>￥</i><span>{{price}}</span></p>
			<div class="goPay" @click="goPay">
				去支付
			</div>
		</div>
	</div>
</template>

<script>
	export default({
		data(){
			return{
				list:"",
				price:""
			}
		},
		computed:{
			
		},
		watch: {
			
		},
		methods:{
			back(){
				this.$router.push("/shopCar")
			},
			goPay(){
				if(localStorage.token){
					alert("支付成功")
				}else{
					this.$router.push("/login")
				}
			}
		},
		mounted() {
			console.log("组件挂载",this.$store.state.sumPrice)
			this.list=this.$route.params.info
			this.price=this.$route.params.price
		}
	})
</script>

<style lang="less" scoped="scoped">
	@import "~style/index";
	.pay-wrap{
		position: fixed;
		bottom: 0;
		top: 0;
		.w(375);
		background: #f5f5f5;
		z-index:1;
		.head{
			.w(375);
			.h(50);
			.l_h(50);
			background:#fff;
			text-align: center;
			i{
				.w(50);
				.h(50);
				.l_h(50);
				text-align:center;
				float:left;
				
			}
		}
		.scroll-box{
			.w(375);
			position:fixed;
			.top(60);
			.bottom(40);
			.min{
				ul{
					.w(375);
					.padding(10,10,10,10);
					box-sizing:border-box;
					background:#fff;
					li{
						.h(40);
						.l_h(40);
						border-bottom:1px solid #ccc;
						
						img{
							.w(40);
							.h(40);
							float:left;
						}
						p{
							float: right;
						}
					}
				}
				.sum-price{
					.margin(10,0,0,0);
					.padding(10,10,10,10);
					background:#fff;
					span{
						float: right;
						font-weight: 900;
						color: #ff65af;
					}
				}
				.address-box{
					.margin(10,0,0,0);
					.padding(10,10,10,10);
					box-sizing: border-box;
					background:#fff;
					.address{
						width: 100%;
						.h(40);
						.l_h(40);
						input{
							.w(200);
							.h(40);
							border-radius: 3px;
							
						}
					}
				}
			}
		}
		.footer{
			.w(375);
			.h(40);
			p{
				.w(150);
				.h(40);
				.l_h(40);
				float: left;
				.margin(0,0,0,10) ;
			}
			.goPay{
				float: right;
				.w(100);
				.h(40);
				background: #ff65af;
				color: #fff;
				text-align: center;
				.l_h(40);
			}
		}
	}
</style>
