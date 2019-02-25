<template>
  <el-menu class="navbar" mode="horizontal">
    <!-- <div class="menu-toggle" @click.prevent="collapse">
        <i class="iconfont icon-menufold" v-show="!collapsed"></i>
        <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
    </div> -->
    <!-- <hamburger class="hamburger-container" :toggleClick="TOGGLE_SIDEBAR" :isActive="sidebar.opened"></hamburger> -->
    <!-- <el-radio-group v-model="isCollapse" style="float:left;margin:left:10px;margin-top: 5px;">
    <el-radio-button :label="false">展开</el-radio-button>
   <el-radio-button :label="true">收起</el-radio-button>
  </el-radio-group> -->
    <Breadcrumb class="breadcumb"/>
    
    <div class="right-menu">
      <el-dropdown class="picUrl-container right-menu-item" trigger="click">
        <div class="picUrl-wrapper">
          <span>{{userName}}</span>
          <img class="user-picUrl" :src="picUrl">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <router-link to="/modify">
            <el-dropdown-item>
             修改
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>


  </el-menu>
</template>

<script>

import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import ErrorLog from '@/components/ErrorLog'
// import Screenfull from '@/components/Screenfull'
// import LangSelect from '@/components/LangSelect'
import moment from 'moment'
 import { mapGetters,createNamespacedHelpers } from "vuex";
 let { mapMutations, mapState, mapActions } = createNamespacedHelpers("user");
export default {
  components: {
    Breadcrumb,
    Hamburger,
    // ErrorLog,
    // Screenfull,
    // LangSelect
  },
  data(){
    return{
        userName:'',
        picUrl:''
    }
    // return{
    //    isCollapse: true
    // }
  },
  computed: {
    // ...mapGetters([
    //   'sidebar',
    //   // 'name',
    //   // 'picUrl'
    // ])
  },
  // computed:{
  //   ...mapState(['picUrl','name'])
  // },
  mounted(){
    this.isLoginAsync().then(({data})=>{
      //  console.log(data.isLogin)
       if(data.isLogin){
         this.userName=data.result[0].userName
         this.picUrl=data.result[0].picUrl
       }else{
         this.$router.push('/login');
         localStorage.removeItem('router')
         localStorage.removeItem('user');
         
       }
    } 
    ).catch((err)=>{
       this.$router.push('/login');
        localStorage.removeItem('router')
         localStorage.removeItem('user');
        
    })
  },
  methods: {
      ...mapActions(['isLoginAsync','logOut']),
   
    
    logout() {
        this.logOut().then(()=>{
          localStorage.setItem('admin',moment().format("YYYY-MM-DD HH:mm:ss"))
         localStorage.removeItem('user');
         localStorage.removeItem('router')
          this.$router.push('/login');
      })
      // LogOut().then(()=>{

      // })
      // this.$store.dispatch('LogOut').then(() => {
      //   location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      // }).catch(() => {
      //   this.$store.dispatch('FedLogOut').then(() => {
      //     location.reload()
      //   })
      // })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    margin-right: 40px;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
    line-height: 50px;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .picUrl-container {
      height: 50px;
      margin-right: 30px;
      .picUrl-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-picUrl {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.el-breadcrumb {
    font-size: 14px;
    line-height: 50px;
    float: left;
    margin-left: 20px;
}
</style>
