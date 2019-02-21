<template>
     <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group>
         <el-breadcrumb-item  v-for="(item,index) in levelList" :key="item.path" >
           <template v-if="item.meta.title">
           <span   v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{item.meta.title}}</span>
           <router-link   v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
           </template>
         </el-breadcrumb-item>

       </transition-group>
     </el-breadcrumb>

    <!-- <transition name="breadcrumb">
     <el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
    </transition> -->

</template>

<script>
// import { generateTitle } from '@/utils/i18n'

export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
   
    getBreadcrumb() {
      //let matched=this.$store.matched.filter(item=>item.name);
      //将会是一个包含从上到下的所有所有对象
     // const first=matched[0];
      // if(first &&first.name!===)
       let matched = this.$route.matched.filter(item => item.name) //$rote.matched 将会是一个包含从上到下的所有对象
      const first = matched[0]
      if (first && first.name !== 'dashboard') {
        matched = [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
