import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
			info:[
				{
					id:5,
					num:2
				},
				{
					id:2,
					num:5
				}
			],
			sumPrice:""
			
  },
  mutations: {
			addInfo(state,params){//params=>id
				console.log(params)
				var obj={
					id:params,
					num:1
				}
				if(state.info==''){
					state.info.push(obj)
				}else{
					for(var i=0;i<state.info.length;i++){
						if(state.info[i].id==params){
							state.info[i].num++
							console.log(state.info)
							return;
						}
					}
					state.info.push(obj)
					console.log(state.info)
				}
				
			},		
			delInfo(state,params){
				state.info.map((item,index)=>{
					if(item.id==params){
						item.num--
					}
				})
			},
			moveInfo(state,params){
				state.info.filter((item,index)=>{
					if(item.id==params){
						state.info.splice(index,1)
					}
					return item
				})
			},
			changeSumPrice(state,params){
				console.log(params)
				state.sumPrice=params
			}
  },
  actions: {

  }
})
