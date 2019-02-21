import axios from 'axios'
import router from './router';
import store from './store';
import Layout from './views/layout/index.vue'
import NProgress from 'nprogress'
const _import = require('./router/_import_' + process.env.NODE_ENV)//获取组件的方法

// import axios from 'axios'
var getRouter;//用来获取后台拿到的路由
const whiteList = ['/login']
router.beforeEach((to,from,next)=>{
    NProgress.start() // 开启Progress
    if(localStorage.getItem('user')){ //验证toke权限是否存在
        if(to.path==='/login'){
            next({path:'/'})
        }else{
            if(!getRouter){
                // 判断是管理员类型
                if(getObjArr('user')[0].userType==0){
                   getRouterS('https://www.easy-mock.com/mock/5c679ccb0df0c43ba31acab9/example/demoquery',to,next)
                   
                }else{
                    getRouterS('https://www.easy-mock.com/mock/5c679ccb0df0c43ba31acab9/example/superadmin',to,next)
                    //next()
                }
                
            }else{
                next()
            }
        }

    }else{
        if(whiteList.indexOf(to.path)!==-1){
            next();
            NProgress.done()
        }else{
            next('/login') //否则全部定向到登陆页
            NProgress.done()
        }
    }

})
router.afterEach((to, from) => {
   NProgress.done()
  })

function routerGo(to,next){
    getRouter=filterAsyncRouter(getRouter)//过滤路由
    router.addRoutes(getRouter)//动态添加
    store.getters.antRouter =getRouter;//将路由数据添加给全局变量，做侧边栏菜单渲染工作
    next({...to,replace:true})
}
function saveObjArr(name,data){ //localStorage存储数组对象的方法
    localStorage.setItem(name,JSON.stringify(data))

}
function getObjArr(name){
    //locaStorage获取数组对象的方法
    return JSON.parse(window.localStorage.getItem(name))
}
function filterAsyncRouter(asyncRouterMap){
    console.log(asyncRouterMap)
    //遍历后台传来的路由字符串 转换为组件对象
    const accessedRouters = asyncRouterMap.filter(route => {
        if (route.component) {
          if (route.component === 'Layout') {//Layout组件特殊处理
            route.component = Layout
          } else {
            route.component = _import(route.component)
          }
        }
        if (route.children && route.children.length) {
          route.children = filterAsyncRouter(route.children)
        }
        return true
      })
    
     return accessedRouters
    
}
function getRouterS(url,to,next){
    if(!getObjArr('router')){
        // https://www.easy-mock.com/mock/5a5da330d9b48c260cb42ca8/example/antrouter
        axios.get(url).then(res=>{ 
        // console.log(res)
        getRouter=res.data.data.router//后台拿到路由
            saveObjArr('router',getRouter)//存储路由到localStorage
            routerGo(to,next)//执行路由跳转
            NProgress.done()
        })
    }else{
        getRouter=getObjArr('router')//拿到路由
        routerGo(to,next)
        NProgress.done()
    }
}