<template>
  <div class="app-wrapper">
 
      <sidebar class="sidebar-container"></sidebar>
      <div class="main-container">
        <app-main></app-main>
      </div>
    
  </div>
</template>

<script>
import AppMain from "@/views/layout/components/AppMain"; //页面布局的右侧区域
import sidebar from "@/views/layout/components/Sidebar/index.vue";
// import sidebar  from '@/views/layout/components/sidebar/index'//页面布局的左侧菜单

export default {
  name: "layout",
  components: {
    sidebar,
    AppMain
  }
};
</script>

<style scoped>
.app-wrapper {
  max-width: 100%;
  display: flex;
  height: 100vh;
  position: relative;
  height: 100%;
  width: 100%;
}
.sidebar-container {
  width: 15%;
  height: 100%;
}
.main-container {
  width: 85%;
  height: 100%;
}
a:-webkit-any-link {
  text-decoration: none;
}
</style>
