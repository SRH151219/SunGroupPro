import Vue from 'vue'
import Router from 'vue-router'
import Home from "components/home"
import Details from "components/details"
import ShopCar from "components/shopCar"
import My from "components/my"
const Login = () => import('components/login')
const Register = () => import('components/register')
const userSet = () => import('components/set')
const Address = () => import('components/address')
const editAddress = () => import('components/editAddress')
const addAddress = () => import('components/addAddress')
const ModifyInfo = () => import('components/modifyInfo')
import Pay from "components/pay"
import myLocalStorage from 'utils/myStorage'
Vue.use(Router)

let router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: "/",
			redirect: "/home",
			component: Home
		},
		{
			path: "/shopCar",
			component: ShopCar
		},
		{
			path: "/login",
			component: Login
		},
		{
			path: "/register",
			component: Register
		},
		{
			path: '/userset',
			component: userSet
		},
		{
			path: "/modifyInfo",
			component: ModifyInfo
		},
		{
			path: '/address',
			component: Address,
			children: [{
				path: 'edit',
				name: 'edit',
				component: editAddress
			}, {
				path: 'add',
				name: 'add',
				component: addAddress
			}]
		},
		{
			path: '/home',
			component: Home,
			children: [{
				path: 'details',
				name: 'details',
				component: Details
			}]
		},
		{
			path: "/home",
			component: Home
		},
		{
			path: "/shopCar",
			component: ShopCar

		},
		{
			path: "/my",
			component: My,
			meta: {
				isLogin: true
			}
		},
		{
			path: "/pay",
			name: "pay",
			component: Pay,
			meta: {
				isLogin: true
			}
		}
	]
})

// 全局守卫
/* router.beforeEach((to, from, next) => {
	// token
	let token = myLocalStorage.get('userToken')
	if (to.meta.isLogin) {
		if (token) {
			next()
		} else {
			next('/login')
		}
	}
	next()

}) */

export default router