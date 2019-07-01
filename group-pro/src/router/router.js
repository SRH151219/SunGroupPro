import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('components/home')
const Details = () => import('components/details')
const ShopCar = () => import('components/shopCar')
const My = () => import('components/my')
const Pay = () => import('components/pay')
const Login = () => import('components/login')
const Register = () => import('components/register')
const userSet = () => import('components/set')
const Address = () => import('components/address')
const editAddress = () => import('components/editAddress')
const addAddress = () => import('components/addAddress')
const ModifyInfo = () => import('components/modifyInfo')
import myLocalStorage from 'utils/myStorage'
Vue.use(Router)

let router = new Router({
	 /* mode: 'history', */
	base: process.env.BASE_URL,
	routes: [{
			path: "/",
			redirect: "/home",
			component: Home
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
			path: "/my",
			component: My,
			meta: {
				isLogin: true
			}
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
			path: "/shopCar",
			component: ShopCar

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
router.beforeEach((to, from, next) => {
	// token
	let token = myLocalStorage.get('userToken')
	if (to.meta.isLogin) {
		if (token) {
			console.log(to.meta.isLogin)
			next()
		} else {
			next('/login')
		}
	}
	next()

})

export default router