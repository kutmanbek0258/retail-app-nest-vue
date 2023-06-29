import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
	{
		// will match everything
		path: '*',
		component: () => import('../views/404.vue'),
	},
	{
		path: '/',
		name: 'Home',
		redirect: '/dashboard',
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		layout: "dashboard",
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
	},
	{
		path: '/sign-in',
		name: 'Sign-In',
		component: () => import('../views/auth/Sign-In.vue'),
	},
	{
		path: '/sign-up',
		name: 'Sign-Up',
		meta: {
			layoutClass: 'layout-sign-up',
		},
		component: () => import('../views/auth/Sign-Up.vue'),
	},
	{
		path: '/verify-email',
		name: 'Verify-email',
		meta: {
			layoutClass: 'layout-verify-email',
		},
		component: () => import('../views/auth/Verify-Email.vue'),
	},
	{
		path: '/forgot-password',
		name: 'forgot-password',
		meta: {
			layoutClass: 'layout-forgot-password-',
		},
		component: () => import('../views/auth/Forgot-Password'),
	},
	{
		path: '/forgot-password-verify',
		name: 'forgot-password-verify',
		meta: {
			layoutClass: 'layout-forgot-password-verify',
		},
		component: () => import('../views/auth/Forgot-Password-Verify'),
	},
	{
		path: '/reset-password',
		name: 'reset-password',
		meta: {
			layoutClass: 'layout-reset-password',
		},
		component: () => import('../views/auth/Reset-Password'),
	},

	{
		path: '/marketing',
		name: 'marketing',
		layout: "dashboard",
		component: () => import('../views/marketing/Marketing'),
	},
	{
		path: '/sales',
		name: 'sales',
		layout: "dashboard",
		component: () => import('../views/sales/Sales'),
	},
	{
		path: '/depot',
		name: 'depot',
		layout: "dashboard",
		component: () => import('../views/depot/Depot'),
	},
	{
		path: '/references',
		name: 'references',
		layout: "dashboard",
		component: () => import('../views/references/References'),
	},
	{
		path: '/references/company',
		name: 'company',
		layout: "dashboard",
		component: () => import('../views/references/company/CompanyList'),
	},
	{
		path: '/references/create-company',
		name: 'company',
		layout: "dashboard",
		component: () => import('../views/references/company/CreateCompany'),
	},
	{
		path: '/references/update-company/:id',
		name: 'company',
		layout: "dashboard",
		component: () => import('../views/references/company/UpdateCompany'),
	},
]

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute( route, parentLayout = "default" )
{
	route.meta = route.meta || {} ;
	route.meta.layout = route.layout || parentLayout ;
	
	if( route.children )
	{
		route.children = route.children.map( ( childRoute ) => addLayoutToRoute( childRoute, route.meta.layout ) ) ;
	}
	return route ;
}

routes = routes.map( ( route ) => addLayoutToRoute( route ) ) ;

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior (to, from, savedPosition) {
		if ( to.hash ) {
			return {
				selector: to.hash,
				behavior: 'smooth',
			}
		}
		return {
			x: 0,
			y: 0,
			behavior: 'smooth',
		}
	}
});

router.beforeEach((to, from, next) => {
	// redirect to login page if not logged in and trying to access a restricted page
	const publicPages = ['/sign-up', '/sign-in', '/verify-email', '/forgot-password', '/forgot-password-verify', '/reset-password'];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = localStorage.getItem('user');

	if (authRequired && !loggedIn) {
		return next('/sign-in');
	}

	next();
});

export default router;
