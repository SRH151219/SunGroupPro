import Vue from 'vue'
import Router from 'vue-router'
import Home from "components/home"
import ShopCar from "components/shopCar"
import My from "components/my"
const Login = () => import('components/login')
const Register = () => import('components/register')
const userSet = () => import('components/set')
const Address = () => import('components/address')
const editAddress = () => import('components/editAddress')
const addAddress = () => import('components/addAddress')
Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: "/",
			redirect: "/home",
			component: Home
			// redirect: "/login",
			// component: Login

		},
		{
			path: "/shopCar",
			component: ShopCar
		},
		{
			path: "/my",
			component: My
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
		}, {
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
		}
	]
})