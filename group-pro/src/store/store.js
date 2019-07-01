import Vue from 'vue'
import Vuex from 'vuex'
import my from './my/index'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		my
	},
	state: {
		foodInfo: [],
		info: [],
		sumPrice: "",
		showFooter:true,
		goodsNum:0
	},
	mutations: {
		changeShowFooter(state,params){
			state.showFooter=params
		},
		
		addInfo(state, params) { //添加商品params=>id
			var obj = {
				id: params,
				num: 1
			}
			if (state.info == '') {
				state.info.push(obj)
			} else {
				for (let index = 0; index < state.info.length; index++) {
					if (state.info[index].id == params) {
						state.info[index].num++
						return
					}
				}
				state.info.push(obj)
			}
		},
		delInfo(state, params) {//减少商品
			state.info.map((item, index) => {
				if (item.id == params) {
					item.num--

				}
			})
			console.log(state.info)
		},
		moveInfo(state, params) {//删除商品
			state.info.filter((item, index) => {
				if (item.id == params) {
					state.info.splice(index, 1)
				}
				return item
			})
			console.log(state.info)
		},
		changeSumPrice(state, params) {
			state.sumPrice = params
		},
		showGoodsNum(state,params){
			state.goodsNum=state.info.length
		}
	},
	actions: {

	}
})
