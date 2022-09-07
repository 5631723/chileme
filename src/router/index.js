import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue')
	}
]

const router = new VueRouter({
	mode:'history',
	routes
})
/* 
// Html5 本地储存   sessionStorage  localStorage
localStorage中存放的数据关闭浏览器后不会消失，会永久保存在本地。
sessionStorage保存的数据，在关闭浏览器后会自动清除
*/

// 全局路由守卫：监控所有路由组件的访问
router.beforeEach(function(to, from, next) {

	let isLogin = sessionStorage.getItem('ELM_TOKEN')
	// isLogin || to.path === '/login'?next():''

	// 如果 isLogin有数据 或者 访问的路径是/login，那么就放行
	if (isLogin || to.path === '/login') {
		next()
	} else {
		// 否则，isLogin没有数据 ，访问的路径是其它地址 就强行跳转到登录页
		next('/login')
	}
})

export default router
