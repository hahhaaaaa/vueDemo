<template>
  <section class="app-main">
    <Navbar></Navbar>
     <!-- <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{path:'/'}"><b>首页</b></el-breadcrumb-item>
        </el-breadcrumb>
     </el-col> -->
    <transition name="fade" mode="out-in">
      <!-- <keep-alive :include="cachedViews"> -->
      <router-view></router-view>
      <!-- </keep-alive> -->
      <!-- <router-view></router-view> -->
    </transition>
  </section>
</template>

<script>
import Navbar from './Navbar.vue'
export default {
  name: 'AppMain',
  components:{Navbar},
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
