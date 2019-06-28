import Vue from 'vue'
import Router from 'vue-router'
import Home from "components/home"
import ShopCar from "components/shopCar"
import My from "components/my"
import Pay from "components/pay"
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
		{
			path:"/",
			redirect:"/home",
			component:Home
		},
		{
			path:"/home",
			component:Home
		},
		{
			path:"/shopCar",
			component:ShopCar
				
		},
		{
			path:"/my",
			component:My
		},
		{
			path:"/pay",
			name:"pay",
			component:Pay
		}
	]
})