import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  		foodInfo:[],
			info:[]		
  },
  mutations: {
			addInfo(state,params){//params=>id
				var obj={
					id:params,
					num:1
				}
				if(state.info==''){
					state.info.push(obj)
				}else{	
					for (let index = 0; index < state.info.length; index++) {
						if(state.info[index].id==params){
							state.info[index].num++
							return
						}						
					}
					state.info.push(obj)
				}
			},		
			delInfo(state,params){
				state.info.map((item,index)=>{
					if(item.id==params){
						item.num--
					}
				})
			}
			
  },
  actions: {

  }
})
