import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
// import Login from './views/login/login.vue'
import store from './store'
import 'nprogress/nprogress.css'// progress bar style
NProgress.configure({ showSpinner: false })// NProgress Configuration

import Layout from './views/layout/index.vue'
// import permission from './store/permission';
// import {constantRouterMap} from './router/index'
// import {constantRouterMap,asyncRouterMap} from './router/index'


Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', 
    meta:{requireAuth:false},
  component: () => import('./views/login/login.vue'), hidden: true },

  { path: '/404', component: () => import('./views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('./views/errorPage/401'), hidden: true },
  {

    path: '/index',
    component: Layout,
    // redirect: 'dashboard',
    children: [{
      path: 'dashboard', component: () => { './views/dashboard/index' }, name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]

  },


]

const router = new Router({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: constantRouterMap,
})

// function hasPermission(roles, permissionRoles) {

//   if (roles.indexOf('ROLE_ADMIN') >= 0) return true // admin permission passed directly

//   if (!permissionRoles) return true

//   return roles.some(role => permissionRoles.indexOf(role) >= 0)

// }
const whiteList = ['/login']






//验证



export default router;



// export const asyncRouterMap = [

//   {
//     path: '/permission',
//     component: Layout,
//     redirect: '/permission/index',
//     name: "权限测试",
//     meta: { role: ['admin', 'super_editor'] },
//     children: [{
//       path: 'index',
//       component: permission,
//       name: "权限测试页",
//       meta: { role: ['admin', 'super-editor'] }
//     }]
//   }, {
//     path: '*',
//     redirect: '/404',
//     hidden: true
//   }

// ]

// router.beforeEach((to, from, next) => {

//   NProgress.start();
//   if (true) {//判断是否有toke
//     if (to.path === '/login') {
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       console.log(store.getters.roles.length, "23")
//       //判断当前是否拉取完user-info用户信息
//       if (store.getters.roles.length === 0) {
//         store.dispatch('user/GetUserInfo').then(res => {
//           const roles = res.data.roles;
//           console.log(roles)
//           //动态添加可访问路由表

//           store.dispatch('permission/GenerateRoutes', { roles }).then(() => {
//             //console.log(store.getters.addRouters)
//             router.addRoutes(store.getters.addRouters)
//             console.log(store.getters.addRouters)
//             next()
//             //next({ ...to, replace: true })
//           })

//         }).catch(() => {
//           store.dispatch('').then(() => {
//             Message.error(this.$t('tips.error_verification'))

//             next({ path: '/login' })
//           })
//         })
//       } else {
//         next() //当用户有权限的时候  说明所有可访问路悠悠已经生成
//         //如访问没权限的全面会自动进入404页面
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path !== 1)) {
//       next()
//     } else {
//       next('/login')
//       NProgress.done()
//     }
//   }
// })
// router.afterEach(() => {
//   NProgress.done()
// })