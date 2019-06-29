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
			<div class="scroll-box">
				<div>
					<ul class="food-box">
						<li v-for="(item,index) in this.list"
						    :key="index">
							<div class="left">
								<img :src="item.img" />
							</div>
							<div class="right">
								<p class="title">{{item.title}}</p>
								<p>{{item.content}}</p>
								<p>
									<i>￥</i>{{item.price}}</p>
								<div class="btn">
									<i class="del"
									   @click="del(item.id,index)">-</i>
									<span ref="sum">{{item.num}}</span>
									<i class="add"
									   @click="add(item.id,index)">+</i>
								</div>
							</div>
						</li>
					</ul>
					<div class="price-box">
						<div>
							<span>商品总价:</span>
							<span>
								<i>￥</i>{{sum}}</span>
						</div>
						<div>
							<span>红包:{{redBag}}</span>
							<span>
								<i>-￥</i>{{redBagPrice}}</span>
						</div>
						<div>
							<span>商品实付</span>
							<span>
								<i>￥</i>{{realSum}}</span>
						</div>
						<div>
							<span>运费(实付满49免邮)</span>
							<span>{{postage}}</span>
						</div>
						<div>
							<span>合计:</span>
							<span>
								<i>￥</i>{{sumPrice}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="pay-box">
				<div class="btn-box">
					<div class="btn"
					     @click="goPay">去结算</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BS from "better-scroll"
export default ({
	data () {
		return {
			show: "",
			info: "",
			list: "",
			redBag: "",
			price: "",
			redBagPrice: 0,
			postage: 6
		}
	},
	computed: {
		sum () {
			var a = 0
			for (var i = 0; i < this.list.length; i++) {
				a += this.list[i].num * this.list[i].price
			}
			return a
		},
		realSum () {
			if (this.sum < 70) {
				this.redBag = "无红包可用"
				this.redBagPrice = 0
				return this.sum
			} else if (70 <= this.sum && this.sum < 100) {
				this.redBag = "10元红包(满70可用)"
				this.redBagPrice = 10
				return this.sum - 10
			} else if (this.sum >= 100 && this.sum <= 150) {
				this.redBag = "20元红包(满100可用)"
				this.redBagPrice = 20
				return this.sum - 20
			} else if (this.sum > 150) {
				this.redBag = "30元红包(满150可用)"
				this.redBagPrice = 30
				return this.sum - 30
			}

		},
		sumPrice () {
			if (this.reslSum == 0) {
				console.log(111)
				this.postage = '+￥0'
				return this.realSum
			} else if (this.realSum >= 49) {
				this.postage = "免邮"
				return this.realSum
			}
			else {
				this.postage = "+￥6"
				return this.realSum + 6
			}
		}
	},
	methods: {
		getinfo () {
			this.$axios.get("/goods.json").then((res) => {
				this.list = res.filter((item, index) => {
					for (var i = 0; i < this.info.length; i++) {
						if (item.id == this.info[i].id) {
							item.num = this.info[i].num
							return item
						}
					}
				})
			})
		},
		del (id, index) {
			if (this.list[index].num == 1) {
				if (confirm("你确定删除该商品吗？")) {
					this.$store.commit("moveInfo", id)
				} else {
					return
				}
				this.getinfo()
			}
			this.list[index].num = this.list[index].num - 1
			this.$store.commit("delInfo", id)
		},
		add (id, index) {
			this.list[index].num = this.list[index].num + 1
			this.$store.commit("addInfo", id)
		},
		goPay () {
			if (localStorage.userToken!="") {//去结算
				console.log(localStorage.userToken)
				this.$store.commit("changeSumPrice", this.sumPrice)
				this.$router.push({ name: "pay", params: { info: this.list, price: this.sumPrice } })
			} else {
				this.$router.push("/login")
			}
			
		},
		isShow () {
			if (this.$store.state.info.length == 0) {
				this.show = true
			} else {
				this.show = false
			}
		}
	},
	mounted () {
		this.scroll = new BS(".scroll-box", { click: true })
		this.getinfo()
		this.isShow()
		this.info = this.$store.state.info
	},
	beforeUpdate (to, from, next) {
		this.isShow()
		next
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
    background: #f5f5f5;
    .empty-box {
      .w(375);
      .h(40);
      position: absolute;
      top: 50%;
      text-align: center;
    }
  }
  .content {
    .scroll-box {
      position: fixed;
      .top(45);
      .bottom(100);
      overflow: hidden;
      .food-box {
        .w(375);
        .margin(5,0,5,0);
        li {
          .w(375);
          .h(130);
          background: #fff;
          .left {
            .w(150);
            .h(130);
            float: left;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .right {
            position: relative;
            float: right;
            .w(220);
            .h(130);
            overflow: hidden;
            .title {
              .margin(20,0,0,0);
              .h(30);
              .l_h(30);
            }
            p {
              .h(30);
              .l_h(30);
            }
            .btn {
              .w(70);
              .h(20);
              position: absolute;
              .bottom(5);
              .right(15);
              i {
                display: inline-block;
                .w(20);
                .h(20);
                text-align: center;
                .l_h(20);
                background: #ff65af;
                border-radius: 50%;
              }
              span {
                .w(30);
                .h(20);
                display: inline-block;
                text-align: center;
                .l_h(20);
              }
            }
          }
        }
      }
    }
    .price-box {
      .w(375);
      .h(235);
      .padding(15,10,15,10);
      background: #fff;
      div {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .h(40);
        border-bottom: 1px solid #ccc;
        .l_h(40);
      }
    }
    .pay-box {
      .w(375);
      background: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      .btn-box {
        .w(375);
        .h(40);
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        .btn {
          .w(100);
          height: 100%;
          background: pink;
          .l_h(38);
          text-align: center;
          float: right;
        }
      }
    }
  }
}
</style>
