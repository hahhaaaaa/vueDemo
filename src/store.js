import Vue from 'vue'
import Vuex from 'vuex'
import layout from './store/layout'
import user from './store/user'
import permission from './store/permission'
import shop from './store/shop'
Vue.use(Vuex)

export default new Vuex.Store({
  // getters:{
  //   routers:state=>state.routerData.routers,
  // },
  getters:{
    // roles:state=>state.user.roles,
    getRouter:state=>state.permission.getRouter,
    // // addRouters: state => state.permission.addRouters,
    // sidebar:state=>state.layout.sidebar,
    // device:state=>state.layout.device
    // addRouters: state => state.routerData.addRouters,

    // token: state => state.token,

    // info: state => state.role.info,

    // routers: state => state.routerData.routers,

    // logoShow: state => state.layout.logoShow,

    // isCollapse: state => state.layout.isCollapse,

    // uniquerouter: state => state.layout.uniquerouter,

    // tabnavBox: state => state.layout.tabnavBox,

    // visible: state => state.layout.visible,

    // left: state => state.layout.left,

    // top: state => state.layout.top,

    // rightNav: state => state.layout.rightNav,
  },
  modules:{
    user,
    layout,
    permission,
    shop
  }
})
